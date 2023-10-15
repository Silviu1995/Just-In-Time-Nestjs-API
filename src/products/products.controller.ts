import { Controller,Post, Param, Body, ParseIntPipe,UseGuards, Get, Patch, ValidationPipe } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import {AuthGuard} from '@nestjs/passport'
import { Product } from './product.entity';
import { UpdateProductDto } from './dto/update-product.dto';
@Controller('products')

export class ProductsController {
    constructor(private productService: ProductsService){}
    @Post('/:id')
    @UseGuards(AuthGuard())
    async createProduct(
        @Param('id',ParseIntPipe)restaurantId:number,
        @Body()createProductDto: CreateProductDto,
        @GetUser()user:User) {
        return await this.productService.createProduct(restaurantId,createProductDto,user)
    }

    @Get('/:id')
    async getProducts(@Param('id',ParseIntPipe) restaurantId: number): Promise<Product[]> {
        return await this.productService.getProducts(restaurantId)
    }

    @Patch()
    @UseGuards(AuthGuard())
    async updateProduct(
        @Body(ValidationPipe)updateProductDto: UpdateProductDto,
        @GetUser() user: User   ): Promise<Product>{
        return this.productService.updateProduct( updateProductDto, user)
    }
}
