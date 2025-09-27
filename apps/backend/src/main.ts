// apps/backend/src/main.ts
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend connection
  app.enableCors({
    origin: [
      'http://localhost:3001', // Next.js dev server
      'http://localhost:3000', // Alternative frontend port
      'https://yourdomain.com', // Production frontend URL
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });

  // Enable global DTO validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Enable global serialization (this makes @Exclude work)
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Backend running on: http://localhost:${port}`);
}
bootstrap();
