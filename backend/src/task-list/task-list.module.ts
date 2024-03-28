import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskListService } from './task-list.service';
import { TaskListController } from './task-list.controller';
import { TaskList } from './task-list.entity';
import {Task} from '../tasks/task.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Task, TaskList])],
  providers: [TaskListService],
  controllers: [TaskListController],
})
export class TaskListModule {}
