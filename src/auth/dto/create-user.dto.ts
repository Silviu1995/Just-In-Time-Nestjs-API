import { IsEmail, IsIn, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator"
import { UserRole } from "../user.role.enum"


export class CreateUserDto {
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @IsNotEmpty()
    firstName: string
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @IsNotEmpty()
    lastName: string
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
    @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/,
    {message: 'Password too weak'})
    password: string
    @IsIn(['PARTNER','USER','RIDER'])
    role: UserRole
}