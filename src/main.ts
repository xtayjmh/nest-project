import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { AppModule } from './app.module';
import { HttpFilter } from './common/filter';
import { Response } from './common/Response';
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from 'path';
import { JwtAuthGuard } from './auth/jwt-auth/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api') //添加接口前缀:从localhost:3000/变成localhost:3000/api/
  app.useGlobalGuards(new JwtAuthGuard())
  app.use(session({
    secret: "XiaoMan", name: "xm.session",
    rolling: true, cookie: { maxAge: null }
  }))
  app.useGlobalInterceptors(new Response()) //使用全局返回结构
  app.useGlobalFilters(new HttpFilter()) //使用全局异常拦截器
  // http://localhost:3000/images/1671281652420.jpg
  app.useStaticAssets(join(__dirname, 'images'), {
    prefix: '/images'
  })
  await app.listen(3000);
}
bootstrap();
