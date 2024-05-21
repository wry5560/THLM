import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-tronify.dto';
import { IsNotEmpty,IsOptional } from 'class-validator';
export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsNotEmpty()
    id: string;
    @IsOptional()
    phone: string;
    @IsOptional()
    nick_name: string;
}
