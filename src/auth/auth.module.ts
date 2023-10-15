import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[PassportModule.register({
    defaultStrategy:'jwt'
  }),JwtModule.register({
    secret: 'futbinelacioc69',
    signOptions: {
      expiresIn: 3600
    }
  }),
  TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService,UserRepository,JwtStrategy],
  exports: [AuthService,UserRepository,JwtStrategy,PassportModule]
})
export class AuthModule {}
