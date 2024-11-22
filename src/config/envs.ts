import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;

  STRIPE_SECRET: string;
  STRIPE_SUCCESS_URL: string;
  STRIPE_CANCEL_URL: string;
  STRIPE_SIGNING_WEBHOOK_ENDPOINT: string;

  NATS_SERVERS: Array<string>;
}

const envSchema = joi
  .object({
    PORT: joi.number().required(),
    STRIPE_SECRET: joi.string().required(),
    STRIPE_SUCCESS_URL: joi.string().required(),
    STRIPE_CANCEL_URL: joi.string().required(),
    STRIPE_SIGNING_WEBHOOK_ENDPOINT: joi.string().required(),
    //     DATABASE_URL: joi.string().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
  })
  .unknown(true);

const { value, error } = envSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});

if (error) {
  throw new Error('VARIABLES DE ENTORNO INVALIDAS O INCOMPLETAS');
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  stripeSecret: envVars.STRIPE_SECRET,
  stripeSuccessUrl: envVars.STRIPE_SUCCESS_URL,
  stripeCancelUrl: envVars.STRIPE_CANCEL_URL,
  stripeSingingWebhook: envVars.STRIPE_SIGNING_WEBHOOK_ENDPOINT,
  natsServers: envVars.NATS_SERVERS,
};
