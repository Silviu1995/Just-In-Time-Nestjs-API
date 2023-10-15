import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidateUserDto } from './dto/validate-user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { UserRetrived } from './dto/user-retrived.dto';
@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService
        ) {}

    async signUp(createUserDto: CreateUserDto ):Promise<void>{
        return await this.userRepository.singUp(createUserDto)
}

    async signIn(validateUserDto: ValidateUserDto):Promise<UserRetrived>{
        const user = await this.userRepository.validateUser(validateUserDto)
        if(user === null) {
            throw new UnauthorizedException('Invalid Credentials')
        } 
        const payload:JwtPayload = {email:user.email}
        
        const accesToken = this.jwtService.sign(payload)
        const userRetrived: UserRetrived = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            accessToken: accesToken
        }
        return userRetrived



    }
}
