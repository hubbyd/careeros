import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Request, Response, NextFunction } from 'express';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { RolesGuard } from './common/guards/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(),
  });

  app.use((req: Request, res: Response, next: NextFunction) => new LoggerMiddleware().use(req, res, next));

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new RolesGuard(reflector));

  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('AI Career Coach API')
    .setDescription('AI职业成长平台后端API')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  await app.listen(port);
}

bootstrap();
