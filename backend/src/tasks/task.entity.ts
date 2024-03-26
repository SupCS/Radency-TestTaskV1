import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TaskList } from '../task-list/task-list.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  taskName: string;

  @Column()
  taskDescription: string;

  @Column()
  dueDate: string;

  @Column()
  priority: string;

  @ManyToOne(() => TaskList, taskList => taskList.tasks)
  taskList: TaskList;
}
