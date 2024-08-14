import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodoService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTodoDto: CreateTodoDto) {
    try {
      return await this.prismaService.todo.create({
        data: {
          ...createTodoDto,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error creating todo');
    }
  }

  async findAll() {
    try {
      return await this.prismaService.todo.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching todos');
    }
  }

  async findOne(id: string) {
    try {
      const todo = await this.prismaService.todo.findUnique({
        where: { id },
      });
      if (!todo) {
        throw new NotFoundException('Todo not found');
      }
      return todo;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching todo');
    }
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    try {
      const todo = await this.prismaService.todo.update({
        where: { id },
        data: {
          ...updateTodoDto,
        },
      });
      if (!todo) {
        throw new NotFoundException('Todo not found');
      }
      return todo;
    } catch (error) {
      throw new InternalServerErrorException('Error updating todo');
    }
  }

  async remove(id: string) {
    try {
      const todo = await this.prismaService.todo.delete({
        where: { id },
      });
      if (!todo) {
        throw new NotFoundException('Todo not found');
      }
      return todo;
    } catch (error) {
      throw new InternalServerErrorException('Error deleting todo');
    }
  }
}