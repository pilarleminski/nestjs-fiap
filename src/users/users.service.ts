import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { users } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/email/email.service';
@Injectable()
export class UsersService {
    constructor(
      private prisma: PrismaService,
      private emailService: EmailService,
      ) {}

    async getUserById(id: string): Promise<users> {
      const user = await this.prisma.users.findUnique({
        where: {
          id: Number(id), //conversão para numérico
        },
      });
      if (!user) {
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
      }
      return user;
    }

    async verufyUserExists(email: string): Promise<boolean> {
      const user = await this.prisma.users.findUnique({
        where: {
          email,
        },
      });
      return user ? true : false;
    }

  async crypto(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async createUser(data): Promise<users> {
    const { name, email, password } = data;

    const checkUser = await this.verufyUserExists(email);

    if (!checkUser) {

      const user = await this.prisma.users.create({
        data: {
          name,
          email,
          password: await this.crypto(password),
        },
      });

      if(await this.emailService.sendEmail(
        email,
        'Bem vindo ao sistema',
        'Seja muito bem vindo à Matrix',
        {},
      )
      ) {
        console.log('Email enviado com sucesso!');
      }
  
      if (!user) {
        throw new Error('Erro ao criar usuário.');
      }
      return user;
    } else {
      throw new HttpException('Usuário já existe', HttpStatus.BAD_REQUEST);
    }
  }

    async findAll() {
        return this.prisma.users.findMany();
    }

    async findOne(id: string) {
        return this.prisma.users.findUnique({
          where: {
            id: Number(id),
          },
        });
    }

    async updateUser(id: string, req) {
      const user = await this.getUserById(id);
      const { name, email, password } = req;

      // verificando se o e-mail está disponível
      if(email){
        const checkEmail = await this.prisma.users.findMany({
          where: {
            AND: [{email: email}, {id: {not: Number(id)}}],
          },
        });
        if(checkEmail.length > 0){
          throw new HttpException(
            'Email já está sendo utilizado.',
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      const updateUser = await this.prisma.users.update({
        where: {
          id: Number(id),
        },
        data: {
          name: name ? name : user.name,
          email: email ? email : user.email,
          password: password ? password : user.password,
        },
      });
      if (!updateUser) {
        throw new HttpException(
          'Erro ao atualizar usuário',
          HttpStatus.BAD_REQUEST,
        );
      }
        return {msg: `Usuário ${updateUser.name} atualizado com sucesso!`};
    }

    async removeUser(id: string) {
      const user = await this.getUserById(id);
      const deleteUser = await this.prisma.users.delete({
        where: {
          id: Number(id),
        },
      });
      if(!deleteUser) {
        throw new HttpException(
          'Erro ao deleter usuário',
          HttpStatus.BAD_REQUEST,
        );
      }
      return { msg: `Usuário ${user.name} excluído com sucesso!`};
    }
}
