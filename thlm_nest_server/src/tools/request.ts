import axios from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { isDev } from 'src/config';
import { Logger } from '@nestjs/common/services';
const agent = isDev ? new HttpsProxyAgent('http:127.0.0.1:10809') : undefined;
const logger = new Logger('RequestClient');
export class RequestClient {
  axioxInstance;
  constructor(confing) {
    this.axioxInstance = axios.create({
      baseURL: confing.baseURL,
      timeout: confing.timeout || 30000,
      withCredentials: true,
      proxy: false,
      httpsAgent: agent,
    });
    const err = (error) => {
      if (error.response) {
        logger.error(error.response.data);
        // this.logger.error(error.response.status);
        // this.logger.error(error.response.headers);
        return error.response.data;
      } else if (error.request) {
        // 发送请求但是没有响应返回
        // this.logger.log(error.request);
        logger.log(error);
      } else {
        // 其他错误
        logger.error('Error', error.message);
      }
      logger.log(error.config);
    };
    this.axioxInstance.interceptors.response.use((response) => {
      return response.data;
    }, err);
    this.axioxInstance.interceptors.request.use((config) => {
      config = {
        ...config,
        retry: 3,
        retryDelay: 1000,
      };
      return config;
    }, err);
  }
}


