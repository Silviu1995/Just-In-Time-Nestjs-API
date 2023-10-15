import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Review } from './review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { User } from 'src/auth/user.entity';
import { Restaurant } from 'src/restaurants/restaurant.entity';
@Injectable()
export class ReviewRepository extends Repository<Review> {

    constructor(datasource: DataSource) {
        super(Review, datasource.createEntityManager())
    }

    async createReview(
        user: User,restaurant: Restaurant,
         createReviewDto: CreateReviewDto):Promise<void>{
        const {comment, rating} = createReviewDto
        const review = new Review()
        review.comment =comment
        review.rating = rating
        review.restaurant = restaurant
        review.customer = user
        await review.save()
    }
    async getRestaurantReviews(restaurantId:number):Promise<Review[]>{
        const query = this.createQueryBuilder('review')
        query.where('review.restaurantId = :restaurantId',{restaurantId})
        const reviews = await query.getMany()
        return reviews
    }

}