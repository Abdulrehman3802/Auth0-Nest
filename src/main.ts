import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
require('dotenv').config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT,()=>{
    app.useGlobalPipes(new ValidationPipe());  // validation pipe for database
    
    app.enableCors()
    app.useGlobalPipes(
      new ValidationPipe({
        disableErrorMessages: true,
      }),
    );

    console.log(`listeninig on port ${process.env.PORT}`);
  });
}


bootstrap();
