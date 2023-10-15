import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm'
import { UserRole } from './user.role.enum'
import * as bcrypt from 'bcrypt'
import { Review } from 'src/reviews/review.entity'
import { Order } from 'src/orders/order.entity'
import { Restaurant } from 'src/restaurants/restaurant.entity'
@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string
    
    @Column()
    lastName: string

    @Column()
    email: string

    @Column()
    salt: string

    @Column()
    password: string

    @Column()
    role: UserRole
    
    @OneToMany(() => Restaurant, restaurant => restaurant.owner, {eager:true})
    restaurants: Restaurant[];
    
    @OneToMany(() => Review, review => review.customer, {eager:true})
    reviews: Review[];

    @OneToMany(() => Order, order => order.user, { eager:true })
    orders: Order[];

    async validatePassword(password: string):Promise<boolean>{
        const hash = await bcrypt.hash(password, this.salt)
        return hash === this.password
    }
}