import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';
import * as process from 'process';

export const dbDataSourceOptions: DataSourceOptions = {
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
};

export default new DataSource(dbDataSourceOptions);
