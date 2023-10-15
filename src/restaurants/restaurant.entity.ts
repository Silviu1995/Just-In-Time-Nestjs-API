import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, } from 'typeorm'
import { Review } from 'src/reviews/review.entity'
import { Order } from 'src/orders/order.entity'
import { Product } from 'src/products/product.entity'
import { User } from 'src/auth/user.entity'

@Entity()
export class Restaurant extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable:false})
    name: string

    @Column({nullable:false})
    imageUrl: string

    @Column({nullable: false})
    location: string

    @Column('varchar', { array: true, nullable: true })
    specific: string[]

    @Column({nullable:true})
    type: string

    @Column({nullable: true})
    rating: number
    @ManyToOne(()=> User, user => user.restaurants, {eager: false} )
    owner: User

    @Column()
    ownerId: number
    @OneToMany(()=> Product, product => product.restaurant,{eager: true})
    products: Product[]

    @OneToMany(() => Review, review => review.restaurant, {eager:true})
    reviews: Review[];
    
    @OneToMany(() => Order, order => order.restaurant, { eager:true })
    orders: Order[];

}