import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

import { Snowflake } from 'src/tools/snowflake';
import { defaultPageSize } from 'src/config';
import * as moment from 'dayjs';
import { ApisService } from '../apis/apis.service';

const snowflake = new Snowflake(1, 1, 0);
@Injectable()
export class BenefitsService {
  constructor(private readonly apisService: ApisService) {}
  async queryBenefits(
    filterParams,
    pageNo: string | number = 1,
    pageSize: string | number = defaultPageSize,
  ): Promise<any> {
    const res = await this.apisService.queryBenefits({...filterParams,
      pageNo,
      pageSize})
    return res.code === 200 ? res.result : res
  }
  async joinBenefits(
    address:string,
    benefitsId: string,
    benefitsNum: string | number,
    betPoint: string | number,
    sign: string
  ): Promise<any> {
    const res = await this.apisService.joinBenefits({address,
      benefitsId,
      benefitsNum,betPoint,sign})
    return res.code === 200 ? res.result : res
  }
  async queryMemberBenefits(
    params
  ): Promise<any> {
    const res = await this.apisService.queryMemberBenefits(params)
    return res.code === 200 ? res.result : res
  }
  async queryMemberBenefitsByAddress(
    params
  ): Promise<any> {
    const res = await this.apisService.queryMemberBenefitsByAddress(params)
    return res.code === 200 ? res.result : res
  }
}
