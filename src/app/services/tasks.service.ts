import { EventEmitter, Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { Subject } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  selectedTaskList = new Subject<Task[]>(); // при клике на проект меняется набор тасков
  selectedTask = new Subject<Task>();
  selectedProjectName = new Subject<string>();
  selectedTaskIndex = new Subject<number>();
  isTaskSelected = new Subject<boolean>();
  updateTaskList = new Subject<Task[]>();

  projects: Project[] = [
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
      tasks: [new Task('Заниматься спортом', '', false)],
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

  constructor() {}

  getProjects() {
    let allProjects: string[] = [];

    this.projects.forEach((project) => {
      allProjects.push(project.name);
    });

    return allProjects;
  }

  getTasksForProject(selectedProjectName: string) {
    let tasks: Task[] = [];

    const project = this.projects.find(
      (project) => selectedProjectName === project.name
    );

    tasks = project ? project.tasks : [];

    this.selectedTaskList.next(tasks);
    this.selectedProjectName.next(selectedProjectName);
  }

  getSelectedTask(selectedTask: Task, index: number) {
    this.selectedTask.next(selectedTask);
    this.selectedTaskIndex.next(index);
    this.isTaskSelected.next(true);
  }

  addTask(selectedProjectName: string, newTask: Task) {
    const project = this.projects.find(
      (project) => project.name === selectedProjectName
    );

    if (project) {
      project?.tasks.push(newTask);
      this.selectedTaskList.next(project.tasks);
    }
  }

  deleteTask(selectedProjectName: string, index: number) {
    const project = this.projects.find(
      (project) => project.name === selectedProjectName
    );

    project!.tasks.splice(index, 1);

    this.selectedTaskList.next(project!.tasks);
    this.isTaskSelected.next(false);
  }

  updateTask(updatedTask: Task, selectedProjectName: string, index: number) {
    const project = this.projects.find(
      (project) => project.name === selectedProjectName
    );

    if (project) {
      project.tasks[index] = updatedTask;
      this.selectedTaskList.next(project.tasks);
    }
  }
}
