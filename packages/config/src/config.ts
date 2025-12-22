import { config as dotenvConfig } from 'dotenv';
import { existsSync } from 'fs';
import { join, resolve } from 'path';
import { validateEnv } from './env';

/**
 * Carrega as variáveis de ambiente com estratégia de fallback para Monorepos.
 * Tenta encontrar o arquivo .env em múltiplos locais.
 */
const loadEnvironment = () => {
  const possiblePaths = [
    // 1. Raiz do Monorepo (Geralmente onde o pnpm start é rodado)
    resolve(process.cwd(), '.env'),

    // 2. Dentro do pacote de configuração (packages/config/.env)
    resolve(process.cwd(), 'packages/config/.env'),

    // 3. Relativo ao arquivo fonte (Desenvolvimento local / ts-node)
    resolve(__dirname, '../.env'),

    // 4. Relativo ao arquivo compilado (Produção / dist)
    resolve(__dirname, '../../.env'),

    resolve(process.cwd(), '../../.env'), // <-- sobe 2 níveis: apps/backend → project-valkyrie

    // 5. Fallback para apps específicos (ex: apps/backend/.env)
    join(process.cwd(), 'apps/backend/.env'),
  ];

  console.log(`[Config] Procurando .env nestes caminhos:`);
  possiblePaths.forEach((p) => console.log(`  - ${p}`));

  const envPath = possiblePaths.find((path) => existsSync(path));

  if (envPath) {
    // override: true garante que o arquivo .env sobrescreva variáveis antigas em cache
    const result = dotenvConfig({ path: envPath, override: true });

    if (result.error) {
      console.error(`[Config] ❌ Erro ao ler .env: ${result.error.message}`);
    } else {
      console.log(`[Config] ✅ Ambiente carregado de: ${envPath}`);
    }
  } else {
    console.warn('[Config] ⚠️ Nenhum arquivo .env encontrado. Usando variáveis de sistema ou padrões.');
  }
};

// Executa o carregamento imediatamente ao importar este arquivo
loadEnvironment();

const createConfig = () =>
  ({
    // API Configuration
    api: {
      url: process.env.API_URL || 'http://localhost:3000',
      port: parseInt(process.env.PORT || '3000', 10),
      prefix: process.env.API_PREFIX || 'api',
    },

    // Database Configuration
    database: {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      name: process.env.DB_NAME || 'valkyrie',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'LyVw&wZefNVNrq&^',
      get url() {
        return `postgresql://${this.user}:${this.password}@${this.host}:${this.port}/${this.name}`;
      },
    },

    // JWT Configuration
    jwt: {
      secret: process.env.JWT_SECRET || 'dev-secret-change-in-production',
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    },

    // Application Configuration
    app: {
      name: 'Project Valkyrie',
      environment: (process.env.NODE_ENV || 'development') as 'development' | 'production' | 'test',
      isDevelopment: process.env.NODE_ENV !== 'production',
      isProduction: process.env.NODE_ENV === 'production',
      isTest: process.env.NODE_ENV === 'test',
    },

    // CORS Configuration
    cors: {
      origin: process.env.CORS_ORIGIN || '*',
      credentials: true,
    },
  }) as const;

export type Config = ReturnType<typeof createConfig>;

let cachedConfig: Config | null = null;

/**
 * Get the application configuration.
 * Validates environment variables and returns a typed configuration object.
 * Configuration is cached after first call.
 */
export const getConfig = (): Config => {
  if (cachedConfig) {
    return cachedConfig;
  }

  // Validate environment variables using Zod or ClassValidator (from your ./env file)
  validateEnv();

  // Create and cache configuration
  cachedConfig = createConfig();
  return cachedConfig;
};

/**
 * Reset the cached configuration (useful for testing)
 */
export const resetConfig = (): void => {
  cachedConfig = null;
};
