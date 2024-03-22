import { Component, OnInit } from '@angular/core';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { ProjectsComponent } from '../projects/projects.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [ProjectsComponent, TaskListComponent, TaskDetailsComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {

}
