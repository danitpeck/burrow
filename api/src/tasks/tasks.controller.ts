import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './services/tasks.service';
import type { TaskRunResponse } from './dto/task-run.response';

@Controller('api/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(): TaskRunResponse {
    return this.tasksService.create();
  }

  @Get()
  findAll(): TaskRunResponse[] {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): TaskRunResponse {
    return this.tasksService.findOne(id);
  }
}
