import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/auth/user.entity";
import { OrderItem } from "src/order-item/order-item.entity";
import { Order } from "src/orders/order.entity";
import { Product } from "src/products/product.entity";
import { Restaurant } from "src/restaurants/restaurant.entity";
import { Review } from "src/reviews/review.entity";




export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'bacanaru',
    database: 'justintime',
    entities: [Restaurant,User,Review,Order,OrderItem,Product],
    synchronize: true,
}