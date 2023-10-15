import { IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength, Min, MinLength } from "class-validator"

export class UpdateProductDto {
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    productId: number
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    name: string
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(40)
    ingredients: string
    @IsNotEmpty()
    @IsNumber()
    @Min(10)
    @IsPositive()
    weight: number
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @IsPositive()
    price: number
}