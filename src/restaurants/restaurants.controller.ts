import { Controller,Body, Post,Get,Query,ValidationPipe,UseGuards,UsePipes, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { GetRestaurantsFilterDto } from './dto/get-restaurants-filter.dto';
import { Restaurant } from './restaurant.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('restaurants')
export class RestaurantsController {
    constructor(private restaurantService:RestaurantsService){}

    @Get()
    async getRestaurants(@Query(ValidationPipe) getRestaurantsFilterDto:GetRestaurantsFilterDto):Promise<Restaurant[]> {
        return this.restaurantService.getRestaurants(getRestaurantsFilterDto);
  }

    @Post()
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard())
    async createRestaurant(@Body() createRestaurantDto: CreateRestaurantDto, @GetUser() user: User){
        return await this.restaurantService.createRestaurant(createRestaurantDto,user)        

    }

    @Patch('/:id')
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard())
    async editRestaurant(
        @Body()editRestaurantDto: CreateRestaurantDto, 
        @GetUser()user:User, 
        @Param('id', ParseIntPipe) restaurantId: number):Promise<Restaurant>{
            return await this.restaurantService.editRestaurants(restaurantId, editRestaurantDto, user)
        }
    
}
