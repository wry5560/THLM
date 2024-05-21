import { Module } from '@nestjs/common';
import { ScheduleTasksController } from './scheduleTasks.controller';
import { ScheduleTasksService } from './scheduleTasks.service';

@Module({
  imports: [],
  controllers: [ScheduleTasksController],
  providers: [ScheduleTasksService],
  exports: [],
})
export class ScheduleTasksModule {}
