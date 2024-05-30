import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigOptions } from './database/database.config';
import { ConfigModule } from '@nestjs/config';
import { DoctorModule } from './modules';

@Module({
  imports: [
    TypeOrmModule.forRoot(DatabaseConfigOptions),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DoctorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
