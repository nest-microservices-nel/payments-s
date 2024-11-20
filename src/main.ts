import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';

async function bootstrap() {
  const logger = new Logger('Payments-ms');

  const app = await NestFactory.create(AppModule);
  await app.listen(envs.port);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      // exceptionFactory: (errors) => {
      //   const messages = errors.map(
      //     (err) =>
      //       `${err.property} has wrong value ${err.value}, ${Object.values(err.constraints).join(', ')}`,
      //   );
      //   return new RpcException(messages);
      // },
    }),
  );

  logger.log(`Payments micro service running on port ${envs.port}`);
}
bootstrap();
