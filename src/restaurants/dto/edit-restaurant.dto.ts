import { ArrayMinSize, ArrayNotEmpty, IsArray, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator"

export class CreateRestaurantDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    name: string
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(50)
    imageUrl: string
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    location: string
    @IsArray()
    @ArrayMinSize(1)
    @ArrayNotEmpty()
    specific: string[]
    @IsOptional()
    @IsString()
    type: string
}