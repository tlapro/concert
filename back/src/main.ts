import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { loggerGlobal } from './middlewares/logger.middleware';
import { errorLogger } from './middlewares/errorLogger.middleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: `${process.env.FRONTEND_URL}` || 'http://localhost:3000/',
    credentials: true,
  });
  app.use(loggerGlobal);
  app.use(errorLogger);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Argentina Rock - Backend')
    .setDescription(
      'Esta es una API de Argentina Rock, que fue elaborada con NestJs',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3001);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
