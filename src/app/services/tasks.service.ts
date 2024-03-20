import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  taskChanged = new Subject<Task[]>();
  selectedTask = new Subject<Task>();
  isTaskSelected = new Subject<boolean>();
  selectedTaskIndex = new Subject<number>();

  tasks: Task[] = [
    new Task('Поучить ангуляр', '', true),
    new Task('Поиграть в иксбокс', '', false),
    new Task('Помыть жопу', '', false),
    new Task('Hehe', '', false),
  ];

  constructor() {}

  getTasks() {
    return this.tasks.slice();
  }

  addTask(task: Task) {
    this.tasks.push(task);
    this.taskChanged.next(this.tasks.slice());
  }

  checkedTask() {
    this.isTaskSelected.next(false);
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.taskChanged.next(this.tasks.slice());
    this.isTaskSelected.next(false);
  }

  selectTask(index: number) {
    this.selectedTask.next(this.tasks[index]);
    this.selectedTaskIndex.next(index);
    this.isTaskSelected.next(true);
  }

  updateDescription(index: number, newTask: Task) {
    this.tasks[index].description = newTask.description;
    this.taskChanged.next(this.tasks.slice());
  }
}
