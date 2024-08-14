import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UsePipes } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ParseUUIDPipe } from '@nestjs/common';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { ApiTags } from '@nestjs/swagger';

@Controller('todo')
@ApiTags('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  // Create
  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createTodoDto: CreateTodoDto) {
    try {
      return await this.todoService.create(createTodoDto);
    } catch (error) {
      throw new HttpException('Error creating todo', HttpStatus.BAD_REQUEST);
    }
  }

  // Get all todos
  @Get()
  async findAll() {
    try {
      return await this.todoService.findAll();
    } catch (error) {
      throw new HttpException('Error fetching todos', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Get a todo by id
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      return await this.todoService.findOne(id);
    } catch (error) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }
  }


  // Update
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateTodoDto: UpdateTodoDto) {
    try {
      return await this.todoService.update(id, updateTodoDto);
    } catch (error) {
      throw new HttpException('Error updating todo', HttpStatus.BAD_REQUEST);
    }
  }


  // Delete a todo
  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      return await this.todoService.remove(id);
    } catch (error) {
      throw new HttpException('Error deleting todo', HttpStatus.BAD_REQUEST);
    }
  }
}