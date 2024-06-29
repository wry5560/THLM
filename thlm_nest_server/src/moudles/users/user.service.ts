import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { CreateUserDto } from './dto/create-tronify.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Snowflake } from 'src/tools/snowflake';
import { defaultPageSize } from 'src/config';
import * as moment from 'dayjs';
import { ApisService } from '../apis/apis.service';

const snowflake = new Snowflake(1, 1, 0);
@Injectable()
export class UserService {
  constructor(private readonly apisService: ApisService) {}
  async getMemberInfo(address: string): Promise<any> {
    const res = await this.apisService.getMemberInfo(address)
    return res.code === 200 ? res.result : res
  }
  async getMemberPointsBalance(address: string): Promise<any> {
    const res = await this.apisService.getMemberPointsBalance(address)
    return res.code === 200 ? res.result : res
  }
  async addStake(params: any): Promise<any> {
    const res = await this.apisService.addStake(params)
    return res.code === 200 ? res.result : res
  }
  async delStake(params: any): Promise<any> {
    const res = await this.apisService.delStake(params)
    return res.code === 200 ? res.result : res
  }
  async queryMemberPointsJournal(
    filterParams,
    pageNo: string | number = 1,
    pageSize: string | number = defaultPageSize,
  ): Promise<any> {
    const res = await this.apisService.queryMemberPointsJournal({...filterParams,pageNo,pageSize})
    return res.code === 200 ? res.result : res
  }
  async queryMemberStake(address:string): Promise<any> {
    const res = await this.apisService.queryMemberStake({address})
    return res.code === 200 ? res.result : res
  }
  async editSocial(data: any): Promise<any> {
    const res = await this.apisService.editSocial(data)
    return res
  }
  async editRealAddress(data: any): Promise<any> {
    const res = await this.apisService.editRealAddress(data)
    return res
  }
}
