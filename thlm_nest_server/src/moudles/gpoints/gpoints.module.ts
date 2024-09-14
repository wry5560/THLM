import { Module } from '@nestjs/common';
import { GpointsController } from './gpoints.controller';
import { GpointsService } from './gpoints.service';
import { ApisModule } from '../apis/apis.module';

@Module({
    imports: [ApisModule],
    controllers: [GpointsController],
    providers:[GpointsService],
})
export class GpointsModule {};
