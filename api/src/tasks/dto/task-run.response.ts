import { TaskRun } from "../models/task-run.model";

export type TaskRunResponse = Omit<TaskRun, 'startedAt' | 'completedAt'> & {
  startedAt: string;
  completedAt?: string;
};
