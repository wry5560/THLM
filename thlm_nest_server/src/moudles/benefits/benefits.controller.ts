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
import { BenefitsService } from './benefits.service';
import { Logger } from '@nestjs/common';

@Controller('benefits')
export class BenefitsController {
  constructor(private readonly benefitsService: BenefitsService) {}
  @Get('')
  async queryBenefits(@Query() params:any) {
    console.log('params',params)
    const { pageNo, pageSize, ...filterParams } = params
    return await this.benefitsService.queryBenefits(filterParams,pageNo,pageSize)
  }
  @Get('joinBenefits')
  async joinBenefits(@Query() params:any) {
    Logger.log('joinBenefits',params)
    const { address, benefitsId, benefitsNum,betPoint,sign,realAddress } = params
    if(!address || !benefitsId || !benefitsNum || !betPoint || !sign || !realAddress) throw new HttpException('缺少参数', HttpStatus.BAD_REQUEST)
    return await this.benefitsService.joinBenefits(address, benefitsId, benefitsNum,betPoint,sign,realAddress)
  }
  @Get('memberBenefits')
  async queryMemberBenefits(@Query() params:any) {
    return await this.benefitsService.queryMemberBenefits(params)
  }
  @Get('memberBenefitsByAddress')
  async queryMemberBenefitsByAddress(@Query() params:any) {
    return await this.benefitsService.queryMemberBenefitsByAddress(params)
  }
}
