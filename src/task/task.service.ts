import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindAllParameters, TaskDto } from './task.dto';

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

  findAll(params: FindAllParameters): TaskDto[] {
    return this.tasks.filter(
      (task) => {
        let match = true;
        if (params.title && !task.title.includes(params.title)) {
          match = false;
        }

        if (params.status && task.status !== params.status) {
          match = false;
        }

        return match
      }
      
    );
  }

  update(task: TaskDto) {
    const foundTask = this.tasks.find((t) => t.id === task.id);

    if (!foundTask) {
      throw new HttpException(
        `Task with id ${task.id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    this.tasks = this.tasks.map((t) => (t.id === task.id ? task : t));
  }

  remove(id: string) {
    let taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      throw new HttpException(
        `Task with id ${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    this.tasks.splice(taskIndex, 1);
  }
}
