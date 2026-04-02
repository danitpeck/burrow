import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRun } from '../models/task-run.model';
import type { TaskRunResponse } from '../dto/task-run.response';
import { TaskOutputService } from './task-output.service';

@Injectable()
export class TasksService {
  private tasks = new Map<number, TaskRun>();

  constructor(private readonly taskOutputService: TaskOutputService) {}

  async create(): Promise<TaskRunResponse> {
    const id = Math.floor(Math.random() * 10000);

    const task: TaskRun = {
      id,
      status: 'running',
      startedAt: new Date(),
    };

    this.tasks.set(id, task);
    
    try {
      const outputPath = await this.taskOutputService.writeTaskOutput(id);

      task.status = 'completed';
      task.completedAt = new Date();
      task.outputPath = outputPath;

      this.tasks.set(id, task);
    } catch (error) {
      task.status = 'failed';
      task.error = error instanceof Error ? error.message : 'Unknown error';
      this.tasks.set(id, task);
    }

    return this.toResponse(task);
  }

  findAll(): TaskRunResponse[] {
    return Array.from(this.tasks.values()).map(task => 
      this.toResponse(task),
    );
  }

  findOne(id: number): TaskRunResponse {
    const task = this.tasks.get(id);

    if (!task) {
      throw new NotFoundException(`Task ${id} not found`);
    }

    return this.toResponse(task);
  }

  private toResponse(task: TaskRun): TaskRunResponse {
    return {
      id: task.id,
      status: task.status,
      startedAt: task.startedAt.toISOString(),
      completedAt: task.completedAt?.toISOString(),
      outputPath: task.outputPath,
      error: task.error,
    };
  }
}
