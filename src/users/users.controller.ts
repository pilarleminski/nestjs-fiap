import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    //injeção de dependência
    constructor(private readonly usersService: UsersService){}
}
