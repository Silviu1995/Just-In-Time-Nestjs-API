import { IsNumber, IsString, Max, MaxLength, Min, MinLength } from "class-validator"

export class CreateReviewDto {
    @IsString()
    @MinLength(4)
    @MaxLength(100)
    comment: string
    @IsNumber()
    @Min(1)
    @Max(5)
    rating: number
}