import { Injectable } from '@nestjs/common'
import {PassportStrategy} from '@nestjs/passport'
import { Strategy, ExtractJwt} from 'passport-jwt'
import { JwtPayload } from './jwt-payload.interface'
import { UserRepository } from './user.repository'
import {UnauthorizedException} from '@nestjs/common'
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private userRepository: UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'futbinelacioc69'
        })
    }
    async validate(payload: JwtPayload){
        const {email} = payload
        const user = await this.userRepository.findOneBy({email})
        if(user === null) {
            throw new UnauthorizedException()
        }
        return user
    }
}