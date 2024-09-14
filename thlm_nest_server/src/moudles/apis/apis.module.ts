import { Module } from '@nestjs/common';
import { ApisService } from './apis.service';
import { GpointsApisService } from './gpoints.apis.service';

@Module({
    controllers: [],
    providers:[ApisService,GpointsApisService],
    exports: [ApisService,GpointsApisService],
})
export class ApisModule {};
