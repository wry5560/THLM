import { Module } from '@nestjs/common';
import { ApisService } from './apis.service';

@Module({
    controllers: [],
    providers:[ApisService],
    exports: [ApisService],
})
export class ApisModule {};
