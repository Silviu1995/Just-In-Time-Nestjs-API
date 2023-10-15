import { Injectable, ConflictException, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt'
import { ValidateUserDto } from "./dto/validate-user.dto";

@Injectable()
export class UserRepository extends Repository<User>{
    constructor(dataSource: DataSource) {
        super(User,dataSource.createEntityManager())
    }


    async singUp(createUserDto: CreateUserDto):Promise<void> {
        const {firstName, lastName, email, password, role} = createUserDto
        const user = new User()
        user.firstName = firstName
        user.lastName = lastName
        user.email = email
        user.salt = await bcrypt.genSalt()
        user.role = role
        user.password = await this.hashPassword(password, user.salt)
        try{
            await user.save();
          } catch (error) {
            if(error.code === '23505') {
              throw new ConflictException('Username already exists')
            } else {
              throw new InternalServerErrorException()
            }
          }
    }


    async validateUser(validateUserDto: ValidateUserDto):Promise<User>{
      const {email, password} = validateUserDto
      const user = await this.findOne({where:{email}})
      if(user && user.validatePassword(password)){
        return user 
      } else {
        return null
      }

    } 

    private async hashPassword(password:string, salt:string){
        return await bcrypt.hash(password, salt)
    }
}