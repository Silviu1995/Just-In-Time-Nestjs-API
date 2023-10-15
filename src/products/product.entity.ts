import { OrderItem } from 'src/order-item/order-item.entity';
import { Restaurant } from 'src/restaurants/restaurant.entity';
import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn} from 'typeorm'

@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    ingredients: string;

    @Column()
    weight: number

    @Column()
    price: number

    @Column({nullable: true})
    oldPrice: number

    @ManyToOne(()=> Restaurant, restaurant => restaurant.products,{eager: false})
    @JoinColumn({name:'restaurantId'})
    restaurant: Restaurant

    @OneToMany(() => OrderItem, orderItem => orderItem.product, { eager:false })
    orderItems: OrderItem[]
}