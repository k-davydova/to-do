import { Component, Input, OnInit } from '@angular/core';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { ProjectsComponent } from '../projects/projects.component';
import { TasksService } from '../../services/tasks.service';
import { StartTaskDetailsComponent } from './start-task-details/start-task-details.component';
@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    ProjectsComponent,
    TaskListComponent,
    TaskDetailsComponent,
    StartTaskDetailsComponent,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent implements OnInit {
  // isSelected!: boolean;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    // this.tasksService.isTaskSelected.subscribe((isSelected) => {
    //   this.isSelected = isSelected;
    // });
  }
}
