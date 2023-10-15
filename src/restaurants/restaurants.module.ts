import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { Restaurant } from './restaurant.entity';
import { RestaurantRepository } from './restaurant.repository';
import { RestaurantsController } from './restaurants.controller';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [TypeOrmModule.forFeature([Restaurant]),AuthModule],
  controllers: [RestaurantsController],
  providers: [RestaurantsService, RestaurantRepository],
  exports: [RestaurantsService, RestaurantRepository]

})
export class RestaurantsModule {}
