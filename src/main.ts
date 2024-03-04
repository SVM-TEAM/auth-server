import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const port = 3010;
  await app.listen(port);
  console.log(`connection port : ${port}`);
}
bootstrap();
