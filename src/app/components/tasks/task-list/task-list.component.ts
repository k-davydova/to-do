import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../../../services/tasks.service';
import { Task } from '../../../models/task.model';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HighlightDirective } from '../../../directives/highlight.directive';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskItemComponent, CommonModule, FormsModule, HighlightDirective],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  @ViewChild('form', { static: false }) taskInput!: NgForm;
  newTask!: string;
  isInputValue: boolean = false;

  tasks!: Task[];
  selectedProjectName!: string;

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    const storedProjectName = localStorage.getItem('selectedProjectName');

    this.selectedProjectName = storedProjectName ? storedProjectName : 'inbox';
    this.tasks = this.tasksService.getTasksForProject(this.selectedProjectName);

    this.tasksService.selectedTaskList.subscribe((task) => {
      this.tasks = task;
    });

    this.tasksService.selectedProjectName.subscribe((name) => {
      this.selectedProjectName = name;
    });
  }

  onAddTask() {
    let inputValue = this.taskInput.value.newTask?.trim();

    if (inputValue) {
      console.log(inputValue);
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
}
