import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [__dirname + '/entity/*.ts'], // or explicit imports
  synchronize: true,
});
