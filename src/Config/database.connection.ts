import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeyEnum } from '../enums/keys.enum';

export const DatabaseConnection = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'mysql',
    port: configService.get<number>(KeyEnum.DATABASE_PORT),
    host: configService.get<string>(KeyEnum.DATABASE_HOST),
    username: configService.get<string>(KeyEnum.DATABASE_USERNAME),
    password: configService.get<string>(KeyEnum.DATABASE_PASSWORD),
    database: configService.get<string>(KeyEnum.DATABASE_NAME),
    entities: ['src/**/*.entity.js'],
    autoLoadEntities: true,
    synchronize: false,
    extra: {
      decimalNumbers: true,
    },
    migrationsTableName: 'migrations',
    migrations: ['src/migration/**/*.js'],
  }),
});
