import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { GetRestaurantsFilterDto } from './dto/get-restaurants-filter.dto';
import { User } from 'src/auth/user.entity';
// import { GetRestaurantsFilterDto } from './dto/get-restaurants-filter.dto';

@Injectable()
export class RestaurantRepository extends Repository<Restaurant> {

    constructor(datasource: DataSource) {
        super(Restaurant, datasource.createEntityManager())
    }

    async createRestaurant(createRestaurantDto: CreateRestaurantDto,user: User):Promise<Restaurant>{
        const {name, imageUrl, location, specific, type} = createRestaurantDto
        const restaurant = new Restaurant()
        restaurant.name = name
        restaurant.imageUrl = imageUrl
        restaurant.location = location
        restaurant.specific = specific
        restaurant.type = type
        restaurant.owner = user
        restaurant.ownerId = user.id
        await restaurant.save()
        delete restaurant.owner
        return restaurant

    }

    

    async getRestaurants(getRestaurantsFilterDto: GetRestaurantsFilterDto):Promise<Restaurant[]>{
        const {location, type} = getRestaurantsFilterDto
        const query = this.createQueryBuilder('restaurant')
        if(location){
            query.andWhere('restaurant.location = :location',{location})
        }
        if(type){
            query.andWhere('restaurant.type = :type', {type})
        }
        query.leftJoinAndSelect('restaurant.products','products');
        query.leftJoinAndSelect('restaurant.reviews', 'reviews')
        
        const restaurants = await query.getMany()
        return restaurants
    }

}