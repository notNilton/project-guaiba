import { NestFactory } from '@nestjs/core';
import { getConfig } from '@project-valkyrie/config';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    // Load and validate configuration
    const config = getConfig();

    // Create NestJS application
    const app = await NestFactory.create(AppModule);

    // Configure CORS
    app.enableCors({
      origin: config.cors.origin,
      credentials: config.cors.credentials,
    });

    // Set global API prefix
    if (config.api.prefix) {
      app.setGlobalPrefix(config.api.prefix);
    }

    // Start server
    await app.listen(config.api.port);

    console.log(`🚀 ${config.app.name} is running on: http://localhost:${config.api.port}/${config.api.prefix}`);
    console.log(`📝 Environment: ${config.app.environment}`);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('❌ Failed to start application:', message);
    process.exit(1);
  }
}

void bootstrap();
