import { join } from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  username: 'postgres',
  password: 'postgres',
  database: 'nestjs-typeorm-101',
  entities: [join(__dirname, './entities/*.entity.{js,ts}')],
  migrations: [join(__dirname, './migrations/*.{js,ts}')],
  cli: {
    entitiesDir: 'src/databases/entiries',
    migrationsDir: 'src/databases/migrations',
  },
  logging: true,
};

export = config;
