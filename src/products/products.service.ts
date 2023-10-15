import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';
import { User } from 'src/auth/user.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { UserRole } from 'src/auth/user.role.enum';
@Injectable()
export class ProductsService {
    constructor( private productRepository: ProductRepository) {

    }

    async createProduct (restaurantId:number, createProductDto: CreateProductDto,user: User):Promise<Product>{
        return await this.productRepository.createProduct(restaurantId,createProductDto,user)
    }

    async getProducts(restaurantId:number):Promise<Product[]>{
        return await this.productRepository.getProducts(restaurantId)
    }

    async getProduct(id:number):Promise<Product>{
        return await this.productRepository.findOneBy({id})
    }
    
    async updateProduct( updateProductDto: UpdateProductDto, user: User){
        if(user.role !== UserRole.PARTNER) {
            throw new UnauthorizedException('Not Authorized to update products')
        }
        return await this.productRepository.updateProduct( updateProductDto)
    }
}
