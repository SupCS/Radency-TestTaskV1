import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskList } from './task-list.entity';

@Injectable()
export class TaskListService {
  constructor(
    @InjectRepository(TaskList)
    private readonly taskListRepository: Repository<TaskList>,
  ) {}

  async create(name: string): Promise<TaskList> {
    const taskList = new TaskList();
    taskList.name = name;
    return this.taskListRepository.save(taskList);
  }

  async findAll(): Promise<TaskList[]> {
    return this.taskListRepository.find({ relations: ['tasks'] });
  }

  async findOne(id: number): Promise<TaskList> {
    return this.taskListRepository.findOneBy({ id });
  }

}
