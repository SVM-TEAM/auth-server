import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });

  // SWAGGER
  const config = new DocumentBuilder()
    .setTitle('인증 서버 api')
    .setDescription(
      'GUARD UNIVERSE 서비스에서 사용하는 모든 인증을 제공합니다.',
    )
    .setVersion('1.0')
    .addTag('인증 서버')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.setGlobalPrefix('api');
  const port = 3010;
  await app.listen(port);
  console.log(`connection port : ${port}`);
}
bootstrap();
