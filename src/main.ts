import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe,  Logger as logger  } from '@nestjs/common';
import { SwaggerConfig } from './common/config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.useGlobalPipes(new ValidationPipe(
    {
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }
  ));
  SwaggerConfig(app);//http://localhost:3000/api/v1/docs
  await app.listen(3000);
  logger.log(`App running on port 3000`);
}
bootstrap();
