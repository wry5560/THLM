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
  Logger.log('tmpParams', tmpParams)
  let postStr = ''
  if(tmpParams)Object.keys(tmpParams).sort().forEach(key => {
    postStr += key + '='+tmpParams[key] + '&'
  })
  postStr = postStr.substring(0, postStr.length - 1) + secretKey + timestamp
  config.headers = {
    'Content-Type': 'application/json',
    'Timestamp': timestamp,
    'X-API-KEY': apiKey,
    'X-Api-Sign': sha1(md5(postStr))
  }
//   Logger.log('config', config)
//   Logger.log('postStr', postStr)
  return await requestClient(config)
}

@Injectable()
export class GpointsApisService {
  constructor() {}
  async getMpsMemberInfo(address: string): Promise<any> {
    return await sendRequest({
      url: baseApiUrl + '/thlm/mps/api/getMpsMemberInfo',
      method: 'get',
      params: {
        address
      }
    });
  }
  async getMpsMemberPointsBalance(address: string): Promise<any> {
    return await sendRequest({
      url: baseApiUrl + '/thlm/mps/api/getMpsMemberPointsBalance',
      method: 'get',
      params: {
        address
      }
    });
  }
  async getAllMpsProjectInfo(params:any): Promise<any> {
    return await sendRequest({
      url: baseApiUrl + '/thlm/mps/api/getAllMpsProjectInfoPage',
      method: 'get',
      params
    });
  }
  async getMpsProjectInfo(projectId:string): Promise<any> {
    return await sendRequest({
      url: baseApiUrl + '/thlm/mps/api/getMpsProjectInfo',
      method: 'get',
      params: {
        projectId
      }
    });
  }
  async queryMpsMemberPayRankPage(params:any): Promise<any> {
    return await sendRequest({
      url: baseApiUrl + '/thlm/mps/api/queryMpsMemberPayRankPage',
      method: 'get',
      params
    });
  }
  async queryMpsMemberPointsJournal(params:any): Promise<any> {
    return await sendRequest({
      url: baseApiUrl + '/thlm/mps/api/queryMpsMemberPointsJournal',
      method: 'get',
      params
    });
  }
  async editMpsMemberInfo(data: any): Promise<any> {
    return await sendRequest({
      url: baseApiUrl + '/thlm/mps/api/editMpsMemberInfo',
      method: 'post',
      data
    });
  }
}
