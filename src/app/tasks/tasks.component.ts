import { Component, OnInit } from '@angular/core';
import { TaskListComponent } from './task-list/task-list.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskListComponent, NavBarComponent, TaskDetailsComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  // selectedTask!: boolean;

  // constructor(private tasksService: TasksService) {}

  // ngOnInit(): void {
  //   this.tasksService.selectedTask.subscribe((task: Task) => {
  //     this.selectedTask = !!task;
  //   });
  // }
}
