import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { AuthModule } from 'src/auth/auth.module';
import { ProductsService } from './products.service';

@Module({
  imports:[TypeOrmModule.forFeature([Product]), RestaurantsModule, AuthModule],
  controllers: [ProductsController],
  providers: [ ProductRepository, ProductsService],
  exports: [ ProductRepository,ProductsService],
})
export class ProductsModule {}
