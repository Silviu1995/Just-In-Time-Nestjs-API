import { Controller, Post, Param, ParseIntPipe, UseGuards, Body, UsePipes, ValidationPipe, Get } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('reviews')

export class ReviewsController {
    constructor(private reviewService: ReviewsService) {
        
    }
    @Post('/:id')
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    async createReview(
        @Param('id',ParseIntPipe) id:number,
        @GetUser() user:User, 
        @Body()createReviewDto: CreateReviewDto):Promise<void>{

        this.reviewService.createReview(user,id,createReviewDto)
    }

    @Get('/:id')
    async getRestaurantReviews(@Param('id',ParseIntPipe)restaurantId: number){
        return this.reviewService.getRestaurantReviews(restaurantId)
    }
}
