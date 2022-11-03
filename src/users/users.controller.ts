import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { users } from '@prisma/client';
import { CreateUserDTO } from './dto/createUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    //injeção de dependência
    constructor(private readonly usersService: UsersService){}

    //criar
    @Post()
    async createUser(@Body() req: CreateUserDTO): Promise<users>{
        return this.usersService.createUser(req);
    }
    //listar todos
    @Get()
    async findAll(){
        return this.usersService.findAll();
    }
    //listar 1
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }
    //atualizar
    @Patch(':id')
    async updateUser(@Param('id') id: string, @Body() req: UpdateUserDTO){
        return this.usersService.updateUser(id, req);
    }
    //deletar
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.usersService.removeUser(id);
    }
}
