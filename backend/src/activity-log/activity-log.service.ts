import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityLog } from './activity-log.entity';

@Injectable()
export class ActivityLogService {
  constructor(
    @InjectRepository(ActivityLog)
    private readonly activityLogRepository: Repository<ActivityLog>,
  ) {}


    findAll(taskId?: number, taskListId?: number): Promise<ActivityLog[]> {
    let queryBuilder = this.activityLogRepository.createQueryBuilder('activityLog');

    if (taskId) {
      queryBuilder = queryBuilder.andWhere('activityLog.taskId = :taskId', { taskId });
    }

    if (taskListId) {
      queryBuilder = queryBuilder.andWhere('activityLog.taskListId = :taskListId', { taskListId });
    }

    return queryBuilder.getMany();
  }

  async logEvent(action: string, description: string, taskId?: number, taskListId?: number): Promise<ActivityLog> {
    const logEntry = this.activityLogRepository.create({
      action,
      description,
      taskId,
      taskListId,
    });

    return this.activityLogRepository.save(logEntry);
  }

  async clearAll(): Promise<void> {
    await this.activityLogRepository.clear();
  }
}
