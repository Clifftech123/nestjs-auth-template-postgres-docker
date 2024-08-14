import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodoService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createTodoDto: CreateTodoDto) {
    return this.prismaService.todo.create({
      data: {
        ...createTodoDto,
      },
    });
  }

  findAll() {
    return this.prismaService.todo.findMany();
  }

  findOne(id: string) {
    return this.prismaService.todo.findUnique({
      where: { id },
    });
  }

  update(id: string, updateTodoDto: UpdateTodoDto) {
    return this.prismaService.todo.update({
      where: { id: id },
      data: {
        ...updateTodoDto,
      },
    });
  }

  remove(id: string) {
    return this.prismaService.todo.delete({
      where: { id },
    });
  }
}
