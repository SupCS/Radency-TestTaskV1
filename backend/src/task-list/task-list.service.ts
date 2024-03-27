import { Injectable, NotFoundException } from '@nestjs/common';
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

  async remove(id: number): Promise<void> {
    const result = await this.taskListRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`TaskList with ID ${id} not found`);
    }
  }

  async update(id: number, name: string): Promise<TaskList> {
    const taskList = await this.taskListRepository.findOneBy({ id });
    if (!taskList) {
      throw new NotFoundException(`TaskList with ID ${id} not found`);
    }
    taskList.name = name;
    return this.taskListRepository.save(taskList);
  }
  
}
