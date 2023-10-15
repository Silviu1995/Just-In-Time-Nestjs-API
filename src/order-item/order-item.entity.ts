import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { Order } from 'src/orders/order.entity';
import { Product } from 'src/products/product.entity';

@Entity()
export class OrderItem extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, order => order.items, {eager: false})
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @ManyToOne(() => Product, product => product.orderItems, {eager: true})
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column()
  quantity: number;

}
