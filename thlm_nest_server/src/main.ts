import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import rateLimit from 'express-rate-limit';
const cors = require('cors');
// import session from 'express-session'  //express 可用  切成Fastify不可用

import { ResponseInterceptor } from './common/response.inerceptor';
import { LogMiddleWare } from './common/globalMiddleWare/logMiddleWare';
import { GlobalGuard } from './common/global.guard';
import { HttpExceptionFilter } from './common/exceptionFilter';

import * as compression from 'compression';
var bodyParser = require('body-parser');

// somewhere in your initialization file

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: [
      'error',
      'warn',
      // 'debug',
      'log',
    ],
  });
  app.use(bodyParser.json({ limit: '10mb', extended: true }));
  //使用cors跨域中间件
  app.use(
    cors({
      credentials: true,
      origin: [
        'http://localhost:5173',
        'http://localhost:8080',
        'http://192.168.32.18:5173',
        'http://103.119.106.13:15180',
        'http://192.168.32.18:3700',
      ],
    }),
  );
  // 使用IP限流中间件
  app.use(
    rateLimit({
      windowMs: 60 * 1000, // 1分钟
      max: 200, // 在15分钟内，每个IP只能发送100个请求
    }),
  );
  //使用session中间件
  // app.use(session({secret:'web3'}))
  //使用全局压缩中间件，启用gzip
  app.use(compression());
  //全局中间件
  app.use(new LogMiddleWare().use);
  //全局守卫,不能有依赖，有的话就用模块来注入
  app.useGlobalGuards(new GlobalGuard());
  //全局错误过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  //全局拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());
  //全局验证管道,nest自带，自动验证DTO
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(3320);
}
bootstrap();
