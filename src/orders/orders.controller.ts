import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    //injeção de dependência
    constructor(private readonly ordersService: OrdersService){}
}
