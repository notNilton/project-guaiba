import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';

/**
 * Global module that provides configuration service to all modules.
 * Configuration is loaded from @project-valkyrie/config package.
 */
@Global()
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
