import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Judlup | DARE Node.js API REST assessment')
    .setVersion('1.0.0')
    .addBearerAuth()
    .addServer('http://localhost:3000/api/v1')
    .setExternalDoc(
      'https://dare-nodejs-assessment.herokuapp.com/assessment-swagger/json',
      'https://dare-nodejs-assessment.herokuapp.com/assessment-swagger/json',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1', app, document);
  await app.listen(3000);
}
bootstrap();
