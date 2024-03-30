import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskList } from '../task-list/task-list.entity';
import { ActivityLogService } from '../activity-log/activity-log.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(TaskList)
    private taskListRepository: Repository<TaskList>,
    private activityLogService: ActivityLogService
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
    const task = this.tasksRepository.create(taskData);
    if (taskListId) {
      const taskList = await this.taskListRepository.findOneBy({ id: taskListId });
      if (!taskList) {
        throw new NotFoundException(`TaskList with ID ${taskListId} not found`);
      }
      task.taskList = taskList;
    }
    const savedTask = await this.tasksRepository.save(task);
  
    await this.activityLogService.logEvent(
      'create',
      `Task '${savedTask.taskName}' was created.`,
      savedTask.id,
      taskListId
    );
  
    return savedTask;
  }
  
  async update(id: number, updateTaskDto: Task): Promise<Task> {
    const task = await this.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    
    // Зберігаємо старі значення для порівняння
    const oldValues = {
      taskName: task.taskName,
      description: task.taskDescription,
      priority: task.priority
    };
  
    // Оновлюємо завдання
    this.tasksRepository.merge(task, updateTaskDto);
    const updatedTask = await this.tasksRepository.save(task);
  
    // Визначаємо, що змінилося
    const changes = [];
    if (oldValues.taskName !== updatedTask.taskName) changes.push('name');
    if (oldValues.description !== updatedTask.taskDescription) changes.push('description');
    if (oldValues.priority !== updatedTask.priority) changes.push('priority');
    
    // Логуємо зміни
    if (changes.length > 0) {
      const changesText = changes.join(', ');
      await this.activityLogService.logEvent(
        'update',
        `Task '${updatedTask.taskName}' (ID${task.id}) had its ${changesText} updated.`,
        updatedTask.id
      );
    }
  
    return updatedTask;
  }
  

  async remove(id: number): Promise<void> {
    const task = await this.findOne(id);
    await this.tasksRepository.delete(id);

    await this.activityLogService.logEvent(
      'delete',
      `Task '${task.taskName}' was deleted.`,
      task.id
    );
  }

  async move(id: number, taskListId: number): Promise<Task> {
    const task = await this.findOne(id);
    task.taskList = await this.taskListRepository.findOneBy({ id: taskListId });
    const taskListName = task.taskList ? task.taskList.name : 'Unknown List';
    await this.tasksRepository.save(task);

    await this.activityLogService.logEvent(
      'move',
      `Task '${task.taskName}' was moved to list ${taskListName} (ID${taskListId}).`,
      task.id,
      taskListId
    );

    return task;
  }
}
