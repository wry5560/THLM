import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
// import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Snowflake } from 'src/tools/snowflake';
import * as moment from 'dayjs';
import { Cron } from '@nestjs/schedule';
import { isDev } from 'src/config';

@Injectable()
export class ScheduleTasksService {
  private logger = new Logger(ScheduleTasksService.name);
  constructor(
    // @InjectRedis() private readonly redis: Redis,
  ) {}
  @Cron('0 */10 * * * *')
  async fetchAddressesTronifyInfoCron() {
    if (isDev) return;
    this.logger.log('获取Tornify信息，定时任务执行...');
  }
}
