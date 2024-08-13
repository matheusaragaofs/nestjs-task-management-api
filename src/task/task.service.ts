import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaskDto } from './task.dto';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];

  create(task: TaskDto) {
    this.tasks.push({ ...task, id: Date.now().toString() });
    console.log(this.tasks);
  }

  findById(id: string): TaskDto {
    const foundTask = this.tasks.find((task) => task.id === id);

    if (!foundTask) {
      throw new HttpException(
        `Task with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return foundTask;
  }

  update(task: TaskDto) {
    const foundTask = this.tasks.find((t) => t.id === task.id);

    if (!foundTask) {
      throw new HttpException(
        `Task with id ${task.id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    this.tasks = this.tasks.map((t) => (t.id === task.id ? task : t));
  }
}
