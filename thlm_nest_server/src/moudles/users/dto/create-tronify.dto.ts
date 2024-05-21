import { IsNotEmpty,IsNumber,IsOptional,IsString,IsInt,IsDateString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    phone: string;
    @IsString()
    @IsNotEmpty()
    nick_name: string;
    @IsString()
    password: string;
    @IsString()
    @IsOptional()
    avatar: string;
    @IsString()
    @IsOptional()
    email: string;
    @IsString()
    @IsOptional()
    salt: string;
    @IsString()
    @IsOptional()
    openid: string;
    @IsString()
    @IsOptional()
    invitation_code: string;
    @IsString()
    @IsOptional()
    type: string;
    @IsString()
    @IsOptional()
    status: string;
    @IsInt()
    @IsOptional()
    level: number;
    @IsDateString()
    @IsOptional()
    create_time: string;
    @IsDateString()
    @IsOptional()
    update_time: string;
    @IsDateString()
    @IsOptional()
    create_by: string;
    @IsDateString()
    @IsOptional()
    update_by
    @IsNumber()
    @IsOptional()
    investor_id: number;
    @IsString()
    @IsOptional()
    del_flag:string;
}
