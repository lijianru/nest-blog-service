import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

import * as mongoose from 'mongoose';

async function bootstrap() {
  mongoose.connect('mongodb://localhost/nest-blog-be', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('NestJs 博客')
    .setDescription('第一个博客')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
