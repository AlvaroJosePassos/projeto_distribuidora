import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Usa o ValidationPipe globalmente para validar as entradas nas rotas
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
