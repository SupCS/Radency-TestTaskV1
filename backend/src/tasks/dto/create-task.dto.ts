export class CreateTaskDto {
    readonly taskName: string;
    readonly taskDescription: string;
    readonly dueDate: string;
    readonly priority: string;
    readonly taskListId: number;
}
  