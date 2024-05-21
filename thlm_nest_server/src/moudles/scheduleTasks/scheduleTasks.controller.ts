import { Bind, Body, Controller,Get, Param, Post,HttpException, HttpStatus, Query } from '@nestjs/common';
import { LOGIN_FAIL,NOUSERNAME_OR_NOPASSWORD } from 'src/config/errorCode.config'
import { ScheduleTasksService } from './scheduleTasks.service';

@Controller('scheduleTasks')
export class ScheduleTasksController {
    constructor(){}
    @Get()
    async root(){return 'scheduleTasks root!'}
}
