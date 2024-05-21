import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ApisModule } from '../apis/apis.module';

@Module({
    imports: [ApisModule],
    controllers: [UserController],
    providers:[UserService],
})
export class UserModule {};
