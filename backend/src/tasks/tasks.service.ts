import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskList } from '../task-list/task-list.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(TaskList)
    private taskListRepository: Repository<TaskList>
  ) {}

  async findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { taskListId, ...taskData } = createTaskDto;
    const task = new Task();
    Object.assign(task, taskData);
    if (taskListId) {
      task.taskList = await this.taskListRepository.findOneBy({ id: taskListId });
    }
    return this.tasksRepository.save(task);
  }
  

  async update(id: number, updateTaskDto: Task): Promise<Task> {
    const task = await this.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    // Merge the existing task with the new data and save it
    this.tasksRepository.merge(task, updateTaskDto);
    return this.tasksRepository.save(task);
  }

  async remove(id: number): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}
