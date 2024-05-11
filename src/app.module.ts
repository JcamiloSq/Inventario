import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigConnection } from './Config/config.connection';
import { DatabaseConnection } from './Config/database.connection';
import { UsuarioModule } from './Module/Seguridad/Usuarios/usuario.module';

@Module({
  imports: [ConfigConnection, DatabaseConnection, UsuarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
