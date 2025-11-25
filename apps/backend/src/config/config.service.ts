import { Injectable } from '@nestjs/common';
import { getConfig, type Config } from '@project-valkyrie/config';

/**
 * Injectable service that provides access to application configuration.
 * Configuration is loaded from @project-valkyrie/config package.
 */
@Injectable()
export class ConfigService {
  private readonly config: Config;

  constructor() {
    this.config = getConfig();
  }

  /**
   * Get the entire configuration object
   */
  get all(): Config {
    return this.config;
  }

  /**
   * Get API configuration
   */
  get api() {
    return this.config.api;
  }

  /**
   * Get database configuration
   */
  get database() {
    return this.config.database;
  }

  /**
   * Get JWT configuration
   */
  get jwt() {
    return this.config.jwt;
  }

  /**
   * Get application configuration
   */
  get app() {
    return this.config.app;
  }

  /**
   * Get CORS configuration
   */
  get cors() {
    return this.config.cors;
  }

  /**
   * Check if running in production
   */
  get isProduction(): boolean {
    return this.config.app.isProduction;
  }

  /**
   * Check if running in development
   */
  get isDevelopment(): boolean {
    return this.config.app.isDevelopment;
  }

  /**
   * Check if running in test
   */
  get isTest(): boolean {
    return this.config.app.isTest;
  }
}
