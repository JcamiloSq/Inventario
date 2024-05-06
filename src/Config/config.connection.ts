import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';

const validationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
});

export const ConfigConnection = ConfigModule.forRoot({
  validationSchema: validationSchema,
  expandVariables: true,
  isGlobal: true,
});
