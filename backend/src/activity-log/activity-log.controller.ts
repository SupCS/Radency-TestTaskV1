import { Controller, Get, Delete, Query } from '@nestjs/common';
import { ActivityLogService } from './activity-log.service';
import { ActivityLog } from './activity-log.entity';

@Controller('activity-logs')
export class ActivityLogController {
  constructor(private readonly activityLogService: ActivityLogService) {}

  @Get()
  getAll(@Query('taskId') taskId?: number, @Query('taskListId') taskListId?: number): Promise<ActivityLog[]> {
    return this.activityLogService.findAll(taskId, taskListId);
  }

  @Delete()
  clearHistory(): Promise<void> {
    return this.activityLogService.clearAll();
  }
}
