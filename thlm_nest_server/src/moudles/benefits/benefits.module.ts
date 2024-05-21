import { Module } from '@nestjs/common';
import { BenefitsController } from './benefits.controller';
import { BenefitsService } from './benefits.service';
import { ApisModule } from '../apis/apis.module';

@Module({
    imports: [ApisModule],
    controllers: [BenefitsController],
    providers:[BenefitsService],
})
export class BenefitsModule {};
