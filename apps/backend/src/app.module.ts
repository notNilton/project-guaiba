import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { DocumentsModule } from './documents/documents.module';
import { EmployeeModule } from './employee/employee.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule, AuthModule, EmployeeModule, UsersModule, DocumentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
