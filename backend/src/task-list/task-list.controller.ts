import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { TaskListService } from './task-list.service';
import { TaskList } from './task-list.entity';

@Controller('task-lists')
export class TaskListController {
  constructor(private readonly taskListService: TaskListService) {}

  @Post()
  create(@Body('name') name: string): Promise<TaskList> {
    return this.taskListService.create(name);
  }

  @Get()
  findAll(): Promise<TaskList[]> {
    return this.taskListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<TaskList> {
    return this.taskListService.findOne(id);
  }

}
