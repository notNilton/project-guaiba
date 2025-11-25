export interface EnvironmentVariables {
  // API
  API_URL?: string;
  PORT?: string;
  API_PREFIX?: string;

  // Database
  DB_HOST?: string;
  DB_PORT?: string;
  DB_NAME?: string;
  DB_USER?: string;
  DB_PASSWORD?: string;

  // JWT
  JWT_SECRET?: string;
  JWT_EXPIRES_IN?: string;

  // Application
  NODE_ENV?: 'development' | 'production' | 'test';

  // CORS
  CORS_ORIGIN?: string;
}

/**
 * Validates environment variables based on the current environment.
 * Throws an error if required variables are missing or invalid.
 */
export const validateEnv = (): void => {
  const isProduction = process.env.NODE_ENV === 'production';
  const errors: string[] = [];

  // Required in production
  if (isProduction) {
    const requiredInProduction = ['JWT_SECRET', 'DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'];

    const missing = requiredInProduction.filter((key) => !process.env[key]);
    if (missing.length > 0) {
      errors.push(`Missing required environment variables in production: ${missing.join(', ')}`);
    }

    // Validate JWT secret strength in production
    if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
      errors.push('JWT_SECRET must be at least 32 characters in production');
    }

    // Warn about default values in production
    if (process.env.JWT_SECRET === 'dev-secret-change-in-production') {
      errors.push('JWT_SECRET is using default development value in production');
    }
  }

  // Validate PORT if provided
  if (process.env.PORT) {
    const port = parseInt(process.env.PORT, 10);
    if (isNaN(port) || port < 1 || port > 65535) {
      errors.push(`Invalid PORT value: ${process.env.PORT}. Must be between 1 and 65535`);
    }
  }

  // Validate DB_PORT if provided
  if (process.env.DB_PORT) {
    const dbPort = parseInt(process.env.DB_PORT, 10);
    if (isNaN(dbPort) || dbPort < 1 || dbPort > 65535) {
      errors.push(`Invalid DB_PORT value: ${process.env.DB_PORT}. Must be between 1 and 65535`);
    }
  }

  // Throw error if any validation failed
  if (errors.length > 0) {
    throw new Error(`Environment validation failed:\n${errors.map((e) => `  - ${e}`).join('\n')}`);
  }

  // Log warnings in development
  if (!isProduction && !process.env.JWT_SECRET) {
    console.warn('⚠️  JWT_SECRET not set, using default development value');
  }
};
