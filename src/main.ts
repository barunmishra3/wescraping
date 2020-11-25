import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';
import { AppModule } from './app.module';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.enableCors();   
  const options = new DocumentBuilder()
  .setTitle('Diagnal Test')  
  .setDescription('Diagnal API description')   
  .addServer('https://')  
  .addServer('http://')       
  .addTag('Diagnal')  
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/', app, document); 
  await app.listen(<any>process.env.PORT || 5000);
  console.log(`server started ${process.env.PORT || 5000}`) 
}
bootstrap();
