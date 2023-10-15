import{IsOptional, } from 'class-validator'
export class GetRestaurantsFilterDto {
    @IsOptional()
    type: string
    @IsOptional()
    location: string
    
}