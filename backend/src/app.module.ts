import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskListModule } from './task-list/task-list.module';
import { TasksModule } from './tasks/tasks.module';
import { ActivityLogModule } from './activity-log/activity-log.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL || 'postgresql://postgres:papakanban@localhost:5432/kanban',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'papakanban',
      database: process.env.DB_NAME || 'kanban',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: process.env.TYPEORM_SYNC === 'true',
      extra: {
        ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : null,
      },
    }),
    TaskListModule,
    TasksModule,
    ActivityLogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
