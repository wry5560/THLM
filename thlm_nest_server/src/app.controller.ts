import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // @InjectRedis() private readonly redis: Redis
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  async getRedis(): Promise<string> {
    // const res = await this.redis.get('OKex_AQT001_account')
    return 'test';
  }
}
