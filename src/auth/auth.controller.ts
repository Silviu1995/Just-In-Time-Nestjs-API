import { Controller,Post,Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidateUserDto } from './dto/validate-user.dto';
import { UserRetrived } from './dto/user-retrived.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/signup')
    @UsePipes(ValidationPipe)
    async signUp(@Body() createUserDto: CreateUserDto):Promise<void>{
        return await this.authService.signUp(createUserDto)
    }

    @Post('/signin')
    @UsePipes(ValidationPipe)
    async signIn(@Body() validateUserDto: ValidateUserDto): Promise<UserRetrived> {
        return await this.authService.signIn(validateUserDto)
    }
}
