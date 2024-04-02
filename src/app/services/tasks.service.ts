import { Injectable, OnInit } from '@angular/core';
import { Task } from '../models/task.model';
import { Subject } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  selectedTaskList = new Subject<Task[]>();
  selectedTask = new Subject<Task>();
  selectedProjectName = new Subject<string>();
  selectedTaskIndex = new Subject<number>();
  isTaskSelected = new Subject<boolean>();
  updateTaskList = new Subject<Task[]>();
  updateProjectList = new Subject<Project[]>();

  projects: Project[] = [];

  constructor() {
    this.getProjectsFromLocalStorage();
  }

  getProjects() {
    let allProjects: string[] = [];

    this.projects.forEach((project) => {
      allProjects.push(project.name);
    });

    return allProjects;
  }

  addProject(projectName: string) {
    this.projects.push({
      name: projectName,
      tasks: [],
    });

    this.updateProjectList.next(this.projects);
  }

  deleteProject(index: number) {
    this.projects.splice(index, 1);

    this.updateProjectList.next(this.projects);
    this.getTasksForProject('inbox');

    this.saveToLocalStorage();
  }

  getTasksForProject(selectedProjectName: string) {
    let tasks: Task[] = [];

    const project = this.projects.find(
      (project) => selectedProjectName === project.name
    );

    tasks = project ? project.tasks : [];

    if (tasks.length > 0) {
      localStorage.setItem('selectedTasks', JSON.stringify(tasks));
    }

    localStorage.setItem('selectedProjectName', selectedProjectName);

    this.selectedTaskList.next(tasks);
    this.selectedProjectName.next(selectedProjectName);
    this.isTaskSelected.next(false);

    return tasks;
  }

  getSelectedTask(selectedTask: Task, index: number) {
    this.selectedTask.next(selectedTask);
    this.selectedTaskIndex.next(index);
    this.isTaskSelected.next(true);
  }

  addTask(selectedProjectName: string, newTask: Task) {
    console.log(newTask);
    const project = this.projects.find(
      (project) => project.name === selectedProjectName
    );

    if (project) {
      project?.tasks.push(newTask);
      this.selectedTaskList.next(project.tasks);
    }

    this.selectedTask.next(newTask);
    this.isTaskSelected.next(true);
    this.saveToLocalStorage();
  }

  checkedTask() {
    this.isTaskSelected.next(false);
    this.saveToLocalStorage();
  }

  deleteTask(selectedProjectName: string, index: number) {
    const project = this.projects.find(
      (project) => project.name === selectedProjectName
    );

    project!.tasks.splice(index, 1);

    this.saveToLocalStorage();

    this.selectedTaskList.next(project!.tasks);
    this.isTaskSelected.next(false);
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
      console.error(`Project ${selectedProjectName} not found.`);
      return;
    }

    project.tasks[index] = updatedTask;

    if (selectedProjectName !== newProjectName) {
      const newProject = this.projects.find(
        (project) => project.name === newProjectName
      );

      if (!newProject) {
        console.error(`Project ${newProjectName} not found.`);
        return;
      }

      project.tasks.splice(index, 1);
      newProject.tasks.push(updatedTask);

      this.selectedTaskList.next(newProject.tasks);
    }

    this.saveToLocalStorage();

    this.selectedTaskList.next(project.tasks);
  }

  getProjectsFromLocalStorage() {
    const storedProjects = localStorage.getItem('projects');

    if (storedProjects) {
      this.projects = JSON.parse(storedProjects);
    } else {
      this.projects = [
        {
          name: 'inbox',
          tasks: [
            new Task('Watch reels', '', true),
            new Task('Make to-do tracker', '', false),
          ],
        },
        {
          name: 'To-do',
          tasks: [
            new Task('Adding / removing tasks', '', true),
            new Task('Changing title and description', '', true),
            new Task(
              'Show different tasks',
              'The set of tasks depends on the selected project',
              true
            ),
            new Task(
              'Moving tasks',
              'All tasks can be moved between projects',
              true
            ),
            new Task(
              'Saving to localStorage',
              'All changes are recorded in localStorage and saved when the page is reloaded',
              true
            ),
            new Task("Adding personal project's folders", '', false),
            new Task('Tags', '', false),
            new Task('Change design', '', false),
            new Task('Add animations', '', false),
          ],
        },
        {
          name: 'other',
          tasks: [
            new Task('Play xbox', '', false),
            new Task('Learn english', '', false),
            new Task('Read a book', '', true),
          ],
        },
      ];

      this.saveToLocalStorage();
    }
  }

  saveToLocalStorage() {
    const data = JSON.stringify(this.projects);

    localStorage.setItem('projects', data);
  }
}