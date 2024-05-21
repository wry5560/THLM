import { isDev } from './base.config';

export const redisOptions = {
  host: isDev ? '103.119.106.13' : '10.18.1.151',
  port: isDev ? 26379 : 6379,
  db: 3,
  // password: 'Devel0p@2023',
};

export const mongoOptions = {
  url: isDev
    ? 'mongodb://103.119.106.13:15117/thlm'
    : 'mongodb://10.18.1.151:27017/thlm',
};
