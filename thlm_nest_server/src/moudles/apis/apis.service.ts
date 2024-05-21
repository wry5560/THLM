import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Snowflake } from 'src/tools/snowflake';
import { defaultPageSize } from 'src/config';
import * as moment from 'dayjs';
import { RequestClient} from 'src/tools/request';
import { baseApiUrl } from 'src/config';
import { Logger } from '@nestjs/common';
import * as sha1 from 'sha1';
import * as md5 from 'md5';

const snowflake = new Snowflake(1, 1, 0);

const requestClient = new RequestClient({
  baseUrl: baseApiUrl
}).axioxInstance

const sendRequest = async (config)=>{
  const apiKey = 'a552f7df4ce22a5e7ed34bd23b847fa0'
  const secretKey = 'a09e12194d32ea16ba3a0a7ddb229052f975cb00965df09f02d0df4e965d913d'
  const timestamp = moment().valueOf()
  let tmpParams = {}
  if(config.method === 'get') tmpParams = config.params
  if(config.method === 'post') tmpParams = config.data
  let postStr = ''
  Object.keys(tmpParams).sort().forEach(key => {
    postStr += key + '='+tmpParams[key] + '&'
  })
  postStr = postStr.substring(0, postStr.length - 1) + secretKey + timestamp
  config.headers = {
    'Content-Type': 'application/json',
    'Timestamp': timestamp,
    'X-API-KEY': apiKey,
    'X-Api-Sign': sha1(md5(postStr))
  }
  Logger.log('config', config)
  return await requestClient(config)
}

@Injectable()
export class ApisService {
  constructor() {}
  async getMemberInfo(address: string): Promise<any> {
    return await sendRequest({
      url: baseApiUrl + '/thlm/api/getMemberInfo',
      method: 'get',
      params: {
        address
      }
    });
  }
  async getMemberPointsBalance(address: string): Promise<any> {
    return await sendRequest({
      url: baseApiUrl + '/thlm/api/getMemberPointsBalance',
      method: 'get',
      params: {
        address
      }
    });
  }
  async queryBenefits(params: any): Promise<any> {
    return await sendRequest({
      url: baseApiUrl + '/thlm/api/queryBenefits',
      method: 'get',
      params
    });
  }
  async joinBenefits(params: any): Promise<any> {
    return await sendRequest({
      url: baseApiUrl + '/thlm/api/joinBenefits',
      method: 'get',
      params
    });
  }
  async queryMemberBenefits(params: any): Promise<any> {
    return await sendRequest({
      url: baseApiUrl + '/thlm/api/queryMemberBenefits',
      method: 'get',
      params
    });
  }
  async queryMemberBenefitsByAddress(params: any): Promise<any> {
    return await sendRequest({
      url: baseApiUrl + '/thlm/api/queryMemberBenefitsByAddress',
      method: 'get',
      params
    });
  }
  async queryMemberStake(params: any): Promise<any> {
    return await sendRequest({
      url: baseApiUrl + '/thlm/api/queryMemberStake',
      method: 'get',
      params
    });
  }
  async queryMemberPointsJournal(params: any): Promise<any> {
    return await sendRequest({
      url: baseApiUrl + '/thlm/api/queryMemberPointsJournal',
      method: 'get',
      params
    });
  }
  async addStake(data: any): Promise<any> {
    return await sendRequest({
      url: baseApiUrl + '/thlm/api/addStake',
      method: 'post',
      data
    });
  }
  async delStake(params: any): Promise<any> {
    return await sendRequest({
      url: baseApiUrl + '/thlm/api/delStake',
      method: 'get',
      params
    });
  }
}
