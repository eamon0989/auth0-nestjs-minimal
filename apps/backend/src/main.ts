import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import { writeFile } from 'fs/promises';
import { HttpExceptionFilter } from './common/errors/ http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.enableCors();
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    })
  );
  const config = new DocumentBuilder()
    .setTitle('Auth0 minimal API')
    .setDescription('A minimal NestJs API with Auth0 authentication')
    .setVersion('0.0')
    .build();
  const openApiDocument = SwaggerModule.createDocument(app, config);
  await writeFile('./openapi.json', JSON.stringify(openApiDocument, null, 2));
  SwaggerModule.setup('api', app, openApiDocument);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

void bootstrap();
