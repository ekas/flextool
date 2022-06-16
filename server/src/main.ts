import { NestFactory } from '@nestjs/core';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    abortOnError: false,
  });
  const config = new DocumentBuilder()
    .setTitle('FlexTool API')
    .setDescription('Backend Endpoints for FlexTool')
    .setVersion('1.0')
    .addTag('Auth')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('/', app, document);
  app.enableCors();

  await app.listen(parseInt(process.env.PORT) || 4000);
}
bootstrap();
