import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private tasks = new Map<number, any>();

  create() {
    const id = Math.floor(Math.random() * 10000);

    const task = {
      id,
      status: 'running',
      startedAt: new Date().toISOString(),
    };

    this.tasks.set(id, task);

    setTimeout(() => {
      const existing = this.tasks.get(id);
      if (existing) {
        this.tasks.set(id, {
          ...existing,
          status: 'completed',
          completedAt: new Date().toISOString(),
        });
      }
    }, 3000);

    return task;
  }

  findAll() {
    return this.tasks.size > 0 ? Array.from(this.tasks.values()) : [];
  }

  findOne(id: number) {
    const task = this.tasks.get(id);

    if (!task) {
      throw new NotFoundException(`Task ${id} not found`);
    }

    return task;    
  }
}
