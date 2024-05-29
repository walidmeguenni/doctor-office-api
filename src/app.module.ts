import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigOptions } from './database/database.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(DatabaseConfigOptions),
    ConfigModule.forRoot({
      isGlobal: true, // Makes the ConfigModule globally available
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
