import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }  

  @Put(':id')
  update(@Param('id') id: number, @Body() task: Task): Promise<Task> {
    return this.tasksService.update(id, task);
  }

  @Put(':id/move')
  move(@Param('id') id: number, @Body('taskListId') taskListId: number): Promise<Task> {
    return this.tasksService.move(id, taskListId);
  }


  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.tasksService.remove(id);
  }
}
