import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Order } from "./order.entity";
import { User } from "src/auth/user.entity";
import { CreateOrderDto } from "./dto/create-order.dto";
import { RestaurantRepository } from "src/restaurants/restaurant.repository";
import { OrderItem } from "src/order-item/order-item.entity";

@Injectable()
export class OrderRepository extends Repository<Order> {
    constructor(
        dataSource: DataSource,
        private restaurantRepository: RestaurantRepository
        ) {
        super(Order, dataSource.createEntityManager())
    }

    
  async createOrder(user: User, createOrderDto: CreateOrderDto) : Promise<void> {
    const { items, deliveryAddress } = createOrderDto;

    const total = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    const order = new Order();
    order.user = user;
    order.restaurant = await this.restaurantRepository.findOne({where:{id:createOrderDto.restaurantId}})
    order.deliveryAddress = deliveryAddress;
    order.status = 'pending';
    order.total = total;
    const orderItems = [];
    for (const itemDto of items) {
      const orderItem = new OrderItem();
      orderItem.product = itemDto.product;
      orderItem.quantity = itemDto.quantity;
      orderItem.order = order;
      orderItems.push(orderItem);
    }
    order.items = orderItems
    await order.save()
  }

    async getOrdersById(user:User):Promise<Order[]> {
      const query = this.createQueryBuilder('order')
      const userId = user.id
      query.where('order.userId = :userId',{userId})
      query.leftJoinAndSelect('order.items', 'items')
      query.leftJoinAndSelect('items.product', 'product')
      const orders = await query.getMany()
      return orders
    }
}