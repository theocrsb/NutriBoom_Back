import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import passport from 'passport';
// import { LocalStrategy } from './auth/local.strategy';
import path from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // ajout restriction par format
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: false,
    }),
  );

  // ajout terme 'api' après http://localhost:8080/api/
  // deploy : http://api-nutriboom.dev-formation.fr
  app.setGlobalPrefix('api');
  // changement du port 3000 avec le port 8080
  app.enableCors();
  //ajout CORS

  //8083 pour le deploy
  await app.listen(8083);
  // await app.listen(8080);
}
bootstrap();
