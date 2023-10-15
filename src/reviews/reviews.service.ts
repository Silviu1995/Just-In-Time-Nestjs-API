import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { CreateReviewDto } from './dto/create-review.dto';
import { User } from 'src/auth/user.entity';
import { RestaurantsService } from 'src/restaurants/restaurants.service';
import { UserRole } from 'src/auth/user.role.enum';
import { Review } from './review.entity';

@Injectable()
export class ReviewsService {
    constructor(
        private reviewRepository: ReviewRepository,
        private restaurantService: RestaurantsService
    ){ }

    async createReview(user: User, restaurantId: number, createReviewDto: CreateReviewDto): Promise<void> {
        const restaurant = await this.restaurantService.findRestaurantById(restaurantId);
        
        if (user.role !== UserRole.USER) {
            throw new UnauthorizedException('Not authorized to create review');
        }
        
        if (!restaurant) {
            throw new NotFoundException('Restaurant not found');
        }
        
        await this.reviewRepository.createReview(user, restaurant, createReviewDto);
    }

    async getRestaurantReviews(restaurantId:number):Promise<Review[]>{
        return this.reviewRepository.getRestaurantReviews(restaurantId)
    }
}
