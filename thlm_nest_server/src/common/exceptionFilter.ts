import {Catch,HttpException,ExceptionFilter,ArgumentsHost,Logger} from '@nestjs/common'
import { LOGIN_FAIL, errorCode } from 'src/config/errorCode.config'
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    private logger = new Logger(HttpExceptionFilter.name)
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse()
        const request = ctx.getRequest()

        const exceptionResponse = exception.getResponse() 
        const errorName = typeof exceptionResponse === 'string' ? exceptionResponse : exceptionResponse['error'] || exceptionResponse['message'] || null
        this.logger.log('捕获错误：',errorName)    
        // this.logger.log('Code 信息：',errorCode[errorName])    
        // this.logger.log('Code 信息：',errorCode[LOGIN_FAIL])    

        const status = errorCode[errorName] 
        ? errorCode[errorName].code 
        : exception.getStatus()
        const error = exceptionResponse['error'] || exceptionResponse['message'] || errorName || null
        const message = errorCode[errorName] 
        ? errorCode[errorName].message 
        : (exceptionResponse['message'] || 'Something went wrong')


        response.status(status).json({
            success: false,
            timestamp: new Date().toISOString(),
            data:exceptionResponse,
            path: request.url,
            error,
            message,
            status
        })
    }
}
