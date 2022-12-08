import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import passport from 'passport';
import { LocalStrategy } from './auth/local.strategy';
import path from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // ajout terme 'api' après http://localhost:8080/api/
  app.setGlobalPrefix('api');
  // changement du port 3000 avec le port 8080
  app.enableCors();
  //ajout CORS
  // //require(path.join(__dirname, 'auth.config'))(passport); //Load passport config
  // //ajout passport
  await app.listen(8080);
}
bootstrap();
