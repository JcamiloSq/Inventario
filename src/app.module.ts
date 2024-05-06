import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigConnection } from './Config/config.connection';
import { DatabaseConnection } from './Config/database.connection';

@Module({
  imports: [ConfigConnection, DatabaseConnection],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
