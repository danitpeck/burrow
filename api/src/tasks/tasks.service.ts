import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRun } from './models/task-run.model';
import type { TaskRunResponse } from './dto/task-run.response';

@Injectable()
export class TasksService {
  private tasks = new Map<number, TaskRun>();

  create(): TaskRunResponse {
    const id = Math.floor(Math.random() * 10000);

    const task: TaskRun = {
      id,
      status: 'running',
      startedAt: new Date(),
    };

    this.tasks.set(id, task);

    setTimeout(() => {
      const existing = this.tasks.get(id);
      if (existing) {
        this.tasks.set(id, {
          ...existing,
          status: 'completed',
          completedAt: new Date(),
        });
      }
    }, 3000);

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
      ...task,
      startedAt: task.startedAt.toISOString(),
      completedAt: task.completedAt?.toISOString(),
    };
  }
}
