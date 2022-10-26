import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
    async createProduct(req): Promise<string> {
        return 'Produto cadastrado com sucesso!'
    }
    async listAll() {
        return 'Catálogo';
    }
    async findProduct(id: string) {
        return `Produto ${id}`;
    }
    async updateProduct(id: string, req) {
        return `Produto ${id} atualizado com sucesso!`
    }
}
