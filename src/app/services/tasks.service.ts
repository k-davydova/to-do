import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { Subject } from 'rxjs';
import { Project } from '../models/project.model';
import { DataService } from './data.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  projectList$ = new Subject<string[]>();
  selectedTaskList$ = new Subject<Task[]>();
  selectedTask$ = new Subject<Task>();
  selectedProjectName$ = new Subject<string>();
  selectedTaskIndex$ = new Subject<number>();
  isTaskSelected$ = new Subject<boolean>();
  updateProjectList$ = new Subject<Project[]>();

  projects: Project[] = [];

  constructor(
    private dataService: DataService,
    private localStorageService: LocalStorageService
  ) {
    this.getProjectsFromLocalStorage();
  }

  getProjectsFromLocalStorage() {
    this.projects = this.localStorageService.getFromLocalStorage();

    if (this.projects.length === 0) {
      this.projects = this.dataService.PROJECTS;
      this.saveToLocalStorage();
    }
  }

  saveToLocalStorage() {
    this.localStorageService.saveToLocalStorage(this.projects);
  }

  getProjects(): Project[] {
    const projects = this.projects.map((project) => project.name);
    this.projectList$.next(projects);

    return this.projects;
  }

  addProject(projectName: string): void {
    const newProject: Project = {
      name: projectName,
      tasks: [],
      isRemovable: true,
    };

    this.projects = [...this.projects, newProject];
    this.updateProjectList$.next(this.projects);
  }

  deleteProject(index: number): void {
    this.projects.splice(index, 1);

    this.updateProjectList$.next(this.projects);
    this.getTasksForProject('inbox');

    this.saveToLocalStorage();
  }

  getTasksForProject(selectedProjectName: string): Task[] {
    const project = this.projects.find(
      (project) => project.name === selectedProjectName
    );
    const tasks = project ? project.tasks : [];

    if (tasks.length > 0) {
      localStorage.setItem('selectedTasks', JSON.stringify(tasks));
    }

    localStorage.setItem('selectedProjectName', selectedProjectName);

    this.selectedTaskList$.next(tasks);
    this.selectedProjectName$.next(selectedProjectName);
    this.isTaskSelected$.next(false);

    return tasks;
  }

  getSelectedTask(selectedTask: Task, index: number): void {
    this.selectedTask$.next(selectedTask);
    this.selectedTaskIndex$.next(index);
    this.isTaskSelected$.next(true);

    localStorage.setItem('selectedTask', JSON.stringify(selectedTask));
  }

  addTask(selectedProjectName: string, newTask: Task): void {
    const project = this.projects.find(
      (project) => project.name === selectedProjectName
    );

    if (project) {
      project?.tasks.push(newTask);
      this.selectedTaskList$.next(project.tasks);
    }

    this.selectedTask$.next(newTask);
    this.isTaskSelected$.next(true);
    this.saveToLocalStorage();
  }

  checkedTask(): void {
    this.isTaskSelected$.next(false);
    this.saveToLocalStorage();
  }

  deleteTask(selectedProjectName: string, index: number): void {
    const projectIndex = this.projects.findIndex(
      (project) => project.name === selectedProjectName
    );

    if (projectIndex === -1) {
      return;
    }

    const updatedProjects = [...this.projects];
    updatedProjects[projectIndex].tasks.splice(index, 1);

    this.projects = updatedProjects;

    this.selectedTaskList$.next(updatedProjects[projectIndex].tasks);
    this.isTaskSelected$.next(false);
    this.saveToLocalStorage();
  }

  updateTask(
    updatedTask: Task,
    selectedProjectName: string,
    index: number,
    newProjectName: string
  ) {
    const project = this.projects.find(
      (project) => project.name === selectedProjectName
    );

    if (!project) {
      return;
    }

    project.tasks[index] = updatedTask;

    if (selectedProjectName !== newProjectName) {
      const newProject = this.projects.find(
        (project) => project.name === newProjectName
      );

      if (!newProject) {
        return;
      }

      project.tasks.splice(index, 1);
      newProject.tasks.push(updatedTask);

      this.selectedTaskList$.next(newProject.tasks);
    }

    this.saveToLocalStorage();

    this.selectedTaskList$.next(project.tasks);
  }
}
