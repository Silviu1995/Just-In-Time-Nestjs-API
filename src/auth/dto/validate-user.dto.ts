import { IsString, IsEmail, MinLength, MaxLength, IsNotEmpty } from "class-validator"
export class ValidateUserDto {
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @IsNotEmpty()
    @IsEmail()
    email: string
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @IsNotEmpty()
    password: string
}