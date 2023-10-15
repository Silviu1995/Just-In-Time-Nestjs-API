import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { User } from 'src/auth/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.entity';
import { UserRole } from 'src/auth/user.role.enum';

@Injectable()
export class OrdersService {
    constructor(private orderRepository: OrderRepository){}

    async createOrder(user:User, createOrderDto:CreateOrderDto): Promise<void> {
      if(user.role !== UserRole.USER) {
        throw new UnauthorizedException('Not Authorizez to create orders')
      }
      return await this.orderRepository.createOrder(user,createOrderDto)
    }

    async getOrders(user:User):Promise<Order[]>{
      return await this.orderRepository.getOrdersById(user)
    }
}
