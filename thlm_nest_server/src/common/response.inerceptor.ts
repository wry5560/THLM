//全局响应拦截器，用来格式化返回的数据
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map(result => {
                return {
                    success: true,
                    result,
                    timestamp: new Date().toISOString(),
                    status:200,
                    code:0
                }
            })
        )
    }
}
