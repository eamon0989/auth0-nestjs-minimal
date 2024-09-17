import 'reflect-metadata';
// typeorm.config.ts

import { DataSource } from 'typeorm';
import { UserEntity } from './src/app/users/entities/user.entity';
import { CompanyEntity } from './src/app/companies/entities/company.entity';

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production',
  entities: [UserEntity, CompanyEntity],
  extra: process.env.NODE_ENV === 'production' && {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
