import { TaskStatus } from "../models/task-run.model";

export class TaskRunResponse {
  id: number;
  status: TaskStatus;
  startedAt: string;
  completedAt?: string;
  outputPath?: string;
  error?: string;
};
