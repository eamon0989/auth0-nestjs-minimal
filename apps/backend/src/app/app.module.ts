import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { validate } from '../common/config/env.validation';
import { AuthModule } from '../auth/auth.module';
import { join } from 'node:path';
import { CompaniesModule } from './companies/companies.module';
import { Environment } from '../common/constants/constants';
import { HttpExceptionFilter } from '../common/errors/ http-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({ validate }),
    UsersModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../dist/apps/frontend/browser/'),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        ssl: configService.get<string>('NODE_ENV') !== Environment.Local,
        extra: configService.get<string>('NODE_ENV') !== Environment.Local && {
          ssl: {
            rejectUnauthorized: false,
          },
        },
        synchronize: true,
        logging: false,
        migrationsTableName: 'typeorm_migrations',
        migrations: [],
        migrationsRun: false,
      }),
      inject: [ConfigService],
    }),
    CompaniesModule,
    HealthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
