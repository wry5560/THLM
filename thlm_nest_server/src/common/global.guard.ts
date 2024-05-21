import {CanActivate,ExecutionContext,Injectable} from '@nestjs/common';
import {Observable} from 'rxjs';

@Injectable()
export class GlobalGuard implements CanActivate {
    constructor() {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        //这里加入全局的判断条件
        return true;
    }
}
