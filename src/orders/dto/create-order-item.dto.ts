import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Product } from 'src/products/product.entity';


export class CreateOrderItemDto {
  @IsNotEmpty()
  product: Product;

  @IsNumber()
  @Min(1)
  quantity: number;
}
