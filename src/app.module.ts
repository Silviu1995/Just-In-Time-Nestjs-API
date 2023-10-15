import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import { ProductsModule } from './products/products.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';
import { ReviewsModule } from './reviews/reviews.module';
import { OrderItemModule } from './order-item/order-item.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ProductsModule, 
    RestaurantsModule, 
    OrdersModule, 
    AuthModule, 
    ReviewsModule, OrderItemModule
  ],
  
})
export class AppModule {} 
