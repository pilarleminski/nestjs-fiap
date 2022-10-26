import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { CreateProductsDTO } from './dto/createProduct.dto';
import { UpdateProductDTO } from './dto/updateProduct.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    //injeção de dependência
    constructor(private readonly productsService: ProductsService) {}

    //criar novo produto
    @Post()
    async createProduct(@Body() req: CreateProductsDTO): Promise<string> {
        return this.productsService.createProduct(req);
    }
    //listar todos os produtos
    @Get()
    async listAll() {
        return this.productsService.listAll();
    }
    //procurar produto específico
    @Get(':id')
    async findProduct(@Param('id') id: string) {
        return this.productsService.findProduct(id);
    }
    //atualizar produto
    @Patch(':id')
    async updateProduct(@Param('id') id: string, @Body() req: UpdateProductDTO) {
        return this.productsService.updateProduct(id, req);
    }


}
