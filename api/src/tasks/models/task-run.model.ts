export type TaskStatus = 'running' | 'completed' | 'failed';

export class TaskRun {
  id: number;
  status: TaskStatus;
  startedAt: Date;
  completedAt?: Date;
}
