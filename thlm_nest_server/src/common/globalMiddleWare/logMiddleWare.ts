//全局日志中间件
import { Injectable, NestMiddleware,Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LogMiddleWare implements NestMiddleware {
    use(req: Request, res: Response, next: Function) {
        const logger = new Logger('LogMiddleWare')
        logger.log(req.originalUrl);
        req.query = deleteEmptyParamKey(req.query)
        req.body = deleteEmptyParamKey(req.body)
        req.params = deleteEmptyParamKey(req.params)
        if(req.query && req.query._t) delete req.query._t
        if(req.body && req.body._t)delete req.body._t
        if(req.params && req.params._t)delete req.params._t
        next();
    }
}

function deleteEmptyParamKey(params){
    for(let key in params){
        if(!!!params[key]){
            delete params[key]
        }
    }
    return params
}
