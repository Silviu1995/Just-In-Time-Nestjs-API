import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { CreateOrderDto } from './dto/create-order.dto';
import { User } from 'src/auth/user.entity';
import { Order } from './order.entity';

@Controller('orders')
@UseGuards(AuthGuard())
export class OrdersController {
    constructor(private orderService: OrdersService){}

    @Post()
    @UsePipes(ValidationPipe)
    async createOrder(@GetUser() user: User, @Body() createOrderDto: CreateOrderDto): Promise<void>{
        return await this.orderService.createOrder(user,createOrderDto)
    }

    @Get()
    async getOrders(@GetUser() user:User):Promise<Order[]>{
        return await this.orderService.getOrders(user)
    }
}
