import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../../../services/tasks.service';
import { Task } from '../../../models/task.model';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskItemComponent, CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit, OnDestroy {
  @ViewChild('form', { static: false }) taskInput!: NgForm;

  newTask!: string;
  isInputValue: boolean = false;
  tasks!: Task[];
  selectedProjectName!: string;

  tasksSub!: Subscription;
  selectedProjectNameSub!: Subscription;

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    const storedProjectName = localStorage.getItem('selectedProjectName');

    this.selectedProjectName = storedProjectName ? storedProjectName : 'inbox';
    this.tasks = this.tasksService.getTasksForProject(this.selectedProjectName);

    this.tasksSub = this.tasksService.selectedTaskList$.subscribe((task) => {
      this.tasks = task;
    });

    this.selectedProjectNameSub =
      this.tasksService.selectedProjectName$.subscribe((name) => {
        this.selectedProjectName = name;
      });
  }

  onAddTask() {
    let inputValue = this.taskInput.value.newTask?.trim();

    if (inputValue) {
      const task = {
        title: inputValue,
        description: '',
        isChecked: false,
      };
      this.tasksService.addTask(this.selectedProjectName, task);
    } else {
      this.isInputValue = true;
      setTimeout(() => (this.isInputValue = false), 4000);
    }

    this.taskInput.reset();
  }

  ngOnDestroy(): void {
    this.tasksSub.unsubscribe();
    this.selectedProjectNameSub.unsubscribe();
  }
}
