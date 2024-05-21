import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-tronify.dto';
import { IsNotEmpty,IsNumber,IsNumberString,IsOptional } from 'class-validator';
export class QueryUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    id: string;
    @IsOptional()
    phone: string;
    @IsOptional()
    nick_name: string;
    @IsOptional()
    password: string;
    @IsOptional()
    pageNo: number;
    @IsOptional()
    pageSize: number;
    @IsOptional()
    column: string;
    @IsOptional()
    order: string;
}
