import {
  Bind,
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import {
  LOGIN_FAIL,
  NOUSERNAME_OR_NOPASSWORD,
} from 'src/config/errorCode.config';
import { GpointsService } from './gpoints.service';

import { Logger } from '@nestjs/common';

@Controller('gpoints')
export class GpointsController {
  constructor(private readonly gpointsService: GpointsService) {}
  @Get('memberInfo')
  async getMemberInfo(@Query() params:{address:string}) {
    return await this.gpointsService.getMemberInfo(params.address)
  }
  @Get('memberPointsBalance')
  async getMemberPointsBalance(@Query() params:{address:string}) {
    return await this.gpointsService.getMemberPointsBalance(params.address)
  }
  @Get('allMpsProjectInfo')
  async getAllMpsProjectInfo(@Query() params:any = {}) {
    return await this.gpointsService.getAllMpsProjectInfo(params)
  }
  @Get('mpsProjectInfo')
  async getMpsProjectInfo(@Query() params:{projectId:string}) {
    return await this.gpointsService.getMpsProjectInfo(params.projectId)
  }
  @Get('mpsMemberPayRankPage')
  async queryMpsMemberPayRankPage(@Query() params:any) {
    return await this.gpointsService.queryMpsMemberPayRankPage(params)
  }
  @Get('mpsMemberPointsJournal')
  async queryMpsMemberPointsJournal(@Query() params:any) {
    return await this.gpointsService.queryMpsMemberPointsJournal(params)
  }
  @Post('editMpsMemberInfo')
  async editSocial(@Body() data) {
    return await this.gpointsService.editMpsMemberInfo(data)
  }
}
