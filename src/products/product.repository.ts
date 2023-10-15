import { Injectable, UnauthorizedException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Product } from "./product.entity";
import { RestaurantsService } from "src/restaurants/restaurants.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { User } from "src/auth/user.entity";
import { UpdateProductDto } from "./dto/update-product.dto";


@Injectable()
export class ProductRepository extends Repository<Product>{
    constructor(
        dataSource: DataSource,
        private restaurantService: RestaurantsService,
        ){
        super(Product, dataSource.createEntityManager())
    }

    async createProduct(id:number,createProductDto: CreateProductDto,user:User):Promise<Product> {
        
        const {name, ingredients, weight, price} = createProductDto
        const product = new Product()
        const restaurant = await this.restaurantService.findRestaurantById(id)
        console.log(restaurant.owner)
        product.restaurant = restaurant
        product.name = name
        product.ingredients = ingredients
        product.weight = weight
        product.price = price
        if(user.id !== restaurant.ownerId){
            throw new UnauthorizedException('Not authorized')
        }
        await product.save()
        
        delete product.restaurant
        return product
    }
    
    async getProducts(restaurantId: number):Promise<Product[]>{
        const query = this.createQueryBuilder('product')
        query.andWhere('product.restaurantId = :restaurantId',{restaurantId})
        const products = query.getMany()
        
        return products
    }
    
    async updateProduct( updateProductDto: UpdateProductDto):Promise<Product>{
        const {productId, name, ingredients, weight, price} = updateProductDto
        const product = await this.findOne({where:{id:productId}})
        product.name = name
        product.ingredients = ingredients
        product.weight = weight
        product.oldPrice = product.price
        product.price = price
        await product.save()
        return product
    }
}