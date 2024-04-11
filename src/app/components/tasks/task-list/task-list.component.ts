import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../../../services/tasks.service';
import { Task } from '../../../models/task.model';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  newTask!: string;
  tasks!: Task[];
  selectedProjectName!: string;

  isInputValue = false;

  taskControl = new FormControl('', Validators.required);

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    const storedProjectName = localStorage.getItem('selectedProjectName');

    this.selectedProjectName = storedProjectName ? storedProjectName : 'inbox';
    this.tasks = this.tasksService.getTasksForProject(this.selectedProjectName);

    this.tasksService.selectedTaskList$
      .pipe(takeUntil(this.destroy$))
      .subscribe((task) => {
        this.tasks = task;
      });

    this.tasksService.selectedProjectName$
      .pipe(takeUntil(this.destroy$))
      .subscribe((name) => {
        this.selectedProjectName = name;
      });
  }

  onAddTask() {
    let inputValue = this.taskControl.value?.trim();

    if (inputValue) {
      const task = {
        title: inputValue,
        description: '',
        isChecked: false,
      };

      this.tasksService.addTask(this.selectedProjectName, task);
    } else {
      this.isInputValue = true;

      timer(4000).subscribe(() => (this.isInputValue = false));
    }

    this.taskControl.reset();
  }

  onCheckedTask() {
    this.tasksService.checkedTask();
  }

  onSelectTask(event: { task: Task; index: number }) {
    this.tasksService.getSelectedTask(event.task, event.index);
  }

  onDeleteTask(event: { projectName: string; index: number }) {
    this.tasksService.deleteTask(event.projectName, event.index);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
