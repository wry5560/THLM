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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-tronify.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { Logger } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('memberInfo')
  async getMemberInfo(@Query() params:{address:string}) {
    return await this.userService.getMemberInfo(params.address)
  }
  @Get('memberPointsBalance')
  async getMemberPointsBalance(@Query() params:{address:string}) {
    return await this.userService.getMemberPointsBalance(params.address)
  }
  @Get('memberPointsJournal')
  async queryMemberPointsJournal(@Query() params) {
    const {pageNo, pageSize, ...filterParams} = params
    return await this.userService.queryMemberPointsJournal(filterParams,pageNo,pageSize)
  }
  @Get('memberStake')
  async queryMemberStake(@Query() params) {
    return await this.userService.queryMemberStake(params.address)
  }
}
