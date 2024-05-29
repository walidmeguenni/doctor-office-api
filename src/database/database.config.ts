import { DataSourceOptions } from 'typeorm';

export const DatabaseConfigOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root123',
  database: 'Doctor-Office',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};
