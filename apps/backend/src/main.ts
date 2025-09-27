import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global DTO validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove extra properties
      forbidNonWhitelisted: true, // throw error if extra properties sent
      transform: true, // auto-transform payloads to DTO instances
    }),
  );

  // Enable global serialization (this makes @Exclude work)
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(3000);
}
bootstrap();
