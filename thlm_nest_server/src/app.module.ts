import { Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis';
// import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './moudles/users/user.module';
import { ScheduleTasksModule } from './moudles/scheduleTasks/scheduleTasks.module';
import { BenefitsModule } from './moudles/benefits/benefits.module';
import { ScheduleModule } from '@nestjs/schedule';
import { GpointsModule } from './moudles/gpoints/gpoints.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { redisOptions, mongoOptions } from 'src/config';

@Module({
  imports: [
    UserModule,
    ScheduleTasksModule,
    BenefitsModule,
    GpointsModule,
    // MongooseModule.forRoot(mongoOptions.url),
    // RedisModule.forRoot({
    //   config: redisOptions,
    // }),
    // RedisModule.forRoot(
    //   {
    //     config: { ...redisOptions },
    //   },
    //   'publish',
    // ),
    // RedisModule.forRoot(
    //   {
    //     config: { ...redisOptions },
    //   },
    //   'subscribe',
    // ),
    ScheduleModule.forRoot(), //定时任务 调度
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
