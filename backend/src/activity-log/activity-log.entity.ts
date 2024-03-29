import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class ActivityLog {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  timestamp: Date;

  @Column()
  action: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  taskId: number;

  @Column({ nullable: true })
  taskListId: number;
}
