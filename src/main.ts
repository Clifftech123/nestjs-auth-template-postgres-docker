import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);


  // Swagger Config
  const swaggerConfig = new DocumentBuilder()
    .setTitle('JWT Auth with Prisma, Postgres, docker and NestJS')
    .setDescription(
      'This is an attempt to understand how to use JWT Auth with Prisma, Postgres, and NestJS',
      
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

    // Swagger UI
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // Global Pipes
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.get('APP_PORT') ?? 3100);
  Logger.log(
    `Application is running on: http://localhost:${configService.get(
      'APP_PORT',
    )}`,
  );
}
bootstrap();