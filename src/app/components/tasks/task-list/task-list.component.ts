import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../../../services/tasks.service';
import { Task } from '../../../models/task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskItemComponent, CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  @ViewChild('taskInput', { static: false }) taskInput?: ElementRef;

  tasks!: Task[];
  selectedProjectName!: string;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    // при инициализации
    this.tasks = this.tasksService.projects[0].tasks;
    this.selectedProjectName = 'inbox';

    this.tasksService.selectedTaskList.subscribe((task) => {
      this.tasks = task;
    });

    this.tasksService.selectedProjectName.subscribe((name) => {
      this.selectedProjectName = name;
    });
  }

  onAddTask() {
    let inputValue = this.taskInput?.nativeElement.value;

    const task = {
      title: inputValue,
      description: '',
      isChecked: false,
    };

    if (this.taskInput) {
      this.taskInput.nativeElement.value = '';
    }

    this.tasksService.addTask(this.selectedProjectName, task);
  }
}
