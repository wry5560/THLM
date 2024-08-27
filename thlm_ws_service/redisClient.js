//老的redis-client，已更换 ioredis

const redis = require('redis')
const logger = require('./log4js').logger
// const config = require("./config")
// const {env,redis_config} = config
let client
const initRedis = ()=>{
    // client = redis.createClient(redis_config[env]);
    // client
    //     .on("ready", () => logger.info('------ Redis ready ------'))
    //     .on("connect", () => logger.info('------ Redis connect ------' ))
    //     .on('reconnecting', () => logger.info('------ Redis reconnecting ------'))
    //     .on('warning', (info) => logger.info('------ Redis warning ------',info))
    //     .on('error', err => {
    //         logger.error('------ Redis error ------',err)
    //         logger.info('------ 5S 后重连 ------')
    //         setTimeout(()=>{
    //             initRedis()
    //         },5000)
    //     })
    //     .on('subscribe',(channel,count)=>{
    //         console.log('redis subscribed to ' + channel + ',' + count + 'total subscriptions')
    //     })
}

initRedis()

module.exports = client

