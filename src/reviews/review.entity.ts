import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { Restaurant } from 'src/restaurants/restaurant.entity';
import { User } from 'src/auth/user.entity';

@Entity()
export class Review extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @Column()
  comment: string;

  @ManyToOne(() => Restaurant, restaurant => restaurant.reviews, {eager:false})
  @JoinColumn({ name: 'restaurantId' })
  restaurant: Restaurant;

  @ManyToOne(() => User, user => user.reviews, {eager:false})
  @JoinColumn({ name: 'userId' })
  customer: User;
}
