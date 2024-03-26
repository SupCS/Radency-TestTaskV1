import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskListService } from './task-list.service';
import { TaskListController } from './task-list.controller';
import { TaskList } from './task-list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskList])],
  providers: [TaskListService],
  controllers: [TaskListController],
})
export class TaskListModule {}
