import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { Subject } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  taskChanged = new Subject<Task[]>();
  // taskChanged = new Subject<Project[]>();
  selectedTask = new Subject<Task>();
  isTaskSelected = new Subject<boolean>();
  selectedTaskIndex = new Subject<number>();

  projects: Project[] = [
    {
      name: 'all tasks',
      tasks: [],
    },
    {
      name: 'inbox',
      tasks: [
        new Task('Поучить ангуляр', '', true),
        new Task('Поиграть в иксбокс', '', false),
        new Task('Помыть жопу', '', false),
        new Task('Hehe', '', false),
      ],
    },
    {
      name: 'sport',
      tasks: [
        new Task('Заниматься спортом', '', false),
      ],
    },
    {
      name: 'improvement',
      tasks: [
        new Task('Купить колу', '', false),
        new Task('Подстричься', '', false),
        new Task('Выучить английский', '', false),
      ],
    },
  ];

  // projects: { serviceProjects: string[]; userProjects: string[] } = {
  //   serviceProjects: ['all tasks', 'inbox'],
  //   userProjects: ['sport', 'chores'],
  // };
  // projects: string[] = ['all tasks', 'inbox', 'sport', 'chores'];

  // tasks: Task[] = [
  //   new Task('Поучить ангуляр', '', true, 'inbox'),
  //   new Task('Поиграть в иксбокс', '', false, 'inbox'),
  //   new Task('Помыть жопу', '', false, 'inbox'),
  //   new Task('Hehe', '', true, 'other tasks'),
  //   new Task('Купить колу', '', false, 'sport'),
  //   new Task('Подстричься', '', false, 'sport'),
  //   new Task('Заниматься спортом', '', false, 'chores'),
  //   new Task('Выучить английский', '', false, 'chores'),
  // ];

  constructor() {}

  getTasks() {
    // return this.tasks.slice();
    return this.projects.slice();
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
