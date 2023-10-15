import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { OrderItem } from "./order-item.entity";
import { CreateOrderItemDto } from "src/orders/dto/create-order-item.dto";
import { Order } from "src/orders/order.entity";

@Injectable()
export class OrderItemRepository extends Repository<OrderItem> {
    constructor (dataSource: DataSource){
        super(OrderItem, dataSource.createEntityManager(

        ))
    }
    addOrderItem(order: Order, createOrderItemsDto: CreateOrderItemDto[]){
        createOrderItemsDto.map(orderitem =>{
            const item = new OrderItem()
            item.product = orderitem.product
            item.quantity = orderitem.quantity
            item.order = order
        })
    }
}