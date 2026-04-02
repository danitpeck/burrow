import { Module } from '@nestjs/common';
import { TasksService } from './services/tasks.service';
import { TasksController } from './tasks.controller';
import { TaskOutputService } from './services/task-output.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService, TaskOutputService],
})
export class TasksModule {}
