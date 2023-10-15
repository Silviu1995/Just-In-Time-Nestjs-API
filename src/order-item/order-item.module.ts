import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './order-item.entity';
import { OrderItemRepository } from './order-item.repository';

@Module({
    imports: [TypeOrmModule.forFeature([OrderItem])],
    providers: [OrderItemRepository],
    exports: [OrderItemRepository]
})
export class OrderItemModule {}
