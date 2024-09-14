import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

import { Snowflake } from 'src/tools/snowflake';
import { defaultPageSize } from 'src/config';
import * as moment from 'dayjs';
import { GpointsApisService } from '../apis/gpoints.apis.service';

const snowflake = new Snowflake(1, 1, 0);
@Injectable()
export class GpointsService {
  constructor(private readonly apisService: GpointsApisService) {}
  async getMemberInfo(address: string): Promise<any> {
    const res = await this.apisService.getMpsMemberInfo(address)
    return res.code === 200 ? res.result : res
  }
  async getMemberPointsBalance(address: string): Promise<any> {
    const res = await this.apisService.getMpsMemberPointsBalance(address)
    return res.code === 200 ? res.result : res
  }
  async getAllMpsProjectInfo(params:any): Promise<any> {
    const res = await this.apisService.getAllMpsProjectInfo(params || {})
    return res.code === 200 ? res.result : res
  }
  async getMpsProjectInfo(projectId:string): Promise<any> {
    const res = await this.apisService.getMpsProjectInfo(projectId)
    return res.code === 200 ? res.result : res
  }
  async editMpsMemberInfo(data: any): Promise<any> {
    const res = await this.apisService.editMpsMemberInfo(data)
    return res
  }
  async queryMpsMemberPayRankPage(data: any): Promise<any> {
    const res = await this.apisService.queryMpsMemberPayRankPage(data)
    return res
  }
  async queryMpsMemberPointsJournal(data: any): Promise<any> {
    const res = await this.apisService.queryMpsMemberPointsJournal(data)
    return res
  }
}
