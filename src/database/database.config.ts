import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const DatabaseConfigOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root123',
  database: 'Doctor-Office',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: true,
};
