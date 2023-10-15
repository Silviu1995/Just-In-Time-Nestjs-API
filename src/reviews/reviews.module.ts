import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { ReviewRepository } from './review.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[TypeOrmModule.forFeature([Review]), RestaurantsModule, AuthModule],
  controllers: [ReviewsController],
  providers: [ReviewsService,ReviewRepository],
  exports: [ReviewsService,ReviewRepository],
})
export class ReviewsModule {}
