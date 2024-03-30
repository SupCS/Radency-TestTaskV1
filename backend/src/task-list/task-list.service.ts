import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskList } from './task-list.entity';
import { Task } from '../tasks/task.entity';
import { ActivityLogService } from '../activity-log/activity-log.service';

@Injectable()
export class TaskListService {
  constructor(
    @InjectRepository(TaskList)
    private readonly taskListRepository: Repository<TaskList>,
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>, 
    private activityLogService: ActivityLogService
  ) {}

  async create(name: string): Promise<TaskList> {
    const taskList = this.taskListRepository.create({ name });
    const savedTaskList = await this.taskListRepository.save(taskList);

    await this.activityLogService.logEvent('create_list', `List '${savedTaskList.name}' was created.`, null, savedTaskList.id);

    return savedTaskList;
  }

  async findAll(): Promise<TaskList[]> {
    return this.taskListRepository.find({ relations: ['tasks'], order: { id: 'ASC' } });
  }

  async findOne(id: number): Promise<TaskList> {
    const taskList = await this.taskListRepository.findOneBy({ id });
    if (!taskList) {
      throw new NotFoundException(`TaskList with ID ${id} not found`);
    }
    return taskList;
  }

  async remove(id: number): Promise<void> {
    const taskList = await this.findOne(id);
    if (!taskList) {
      throw new NotFoundException(`TaskList with ID ${id} not found`);
    }
  
    await this.removeAllTasksInList(id);
    await this.taskListRepository.delete(id);
  
    await this.activityLogService.logEvent(
      'delete_list',
      `List '${taskList.name}' (ID${id}) and all its tasks were deleted.`,
      null,
      id
    );
  }
  

  async removeAllTasksInList(taskListId: number): Promise<void> {
    await this.tasksRepository.delete({ taskList: { id: taskListId } });
  }

  async update(id: number, newName: string): Promise<TaskList> {
    const taskList = await this.findOne(id);
    if (!taskList) {
      throw new NotFoundException(`TaskList with ID ${id} not found`);
    }
  
    const oldName = taskList.name;
    if (oldName !== newName) {
      taskList.name = newName;
      await this.taskListRepository.save(taskList);
  
      await this.activityLogService.logEvent(
        'update_list',
        `List '${oldName}' (ID${id}) was renamed to '${newName}'.`,
        null,
        id
      );
    }
    return taskList;
  }
  
}
