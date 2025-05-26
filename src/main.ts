import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Establecer el prefijo global
  //app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  const config = new DocumentBuilder()
    .setTitle('API de Clientes')
    .setDescription('API de Clientes')
    .setVersion('1.0')
    .addTag('clientes')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.enableCors({
    origin: 'http://localhost:3000', // Cambia el puerto si tu frontend usa otro
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
