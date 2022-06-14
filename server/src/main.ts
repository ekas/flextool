import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    abortOnError: false,
  });
  app.useLogger(app.get(Logger));
  app.enableCors();

  const configService = app.get<ConfigService>(ConfigService);

  await app.listen(parseInt(process.env.PORT) || 4000);
}
bootstrap();
