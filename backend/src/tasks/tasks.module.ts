import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './task.entity';
import { TaskList } from '../task-list/task-list.entity';
import { ActivityLogModule } from '../activity-log/activity-log.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, TaskList]),
    ActivityLogModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
