import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './task.entity';
import { TaskList } from '../task-list/task-list.entity';
import { TaskListModule } from '../task-list/task-list.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, TaskList]),
    TaskListModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
