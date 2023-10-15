import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RestaurantRepository } from './restaurant.repository';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { Restaurant } from './restaurant.entity';
import { GetRestaurantsFilterDto } from './dto/get-restaurants-filter.dto';
import { User } from 'src/auth/user.entity';
import { UserRole } from 'src/auth/user.role.enum';
@Injectable()
export class RestaurantsService {
    constructor(private restaurantRepository: RestaurantRepository){}

    async createRestaurant(createRestaurantDto: CreateRestaurantDto,user:User):Promise<Restaurant>{
        if(user.role !== UserRole.PARTNER){
            throw new UnauthorizedException()
        }
        return this.restaurantRepository.createRestaurant(createRestaurantDto,user)
    }

    async findRestaurantById(id:number):Promise<Restaurant>{
        return  this.restaurantRepository.findOneBy({id})
    }

    async getRestaurants(getRestaurantsFilterDto: GetRestaurantsFilterDto):Promise<Restaurant[]>{
        return  this.restaurantRepository.getRestaurants(getRestaurantsFilterDto)
    }

    async editRestaurants(restaurantId:number, editRestaurantDto: CreateRestaurantDto, user: User):Promise<Restaurant> {
        const {name, imageUrl, location, specific, type} = editRestaurantDto
        const restaurant = await this.findRestaurantById(restaurantId)
        if(user.role!==UserRole.PARTNER && restaurant.ownerId !==user.id){
            throw new UnauthorizedException('Not Authorizez to edit the restaurant!')
        } 
        restaurant.name = name
        restaurant.imageUrl = imageUrl
        restaurant.location = location
        restaurant.specific = specific
        restaurant.type = type
        await restaurant.save()
        return restaurant
        
    }
}
