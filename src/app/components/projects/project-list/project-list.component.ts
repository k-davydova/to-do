import { Component, OnInit } from '@angular/core';
import { ProjectItemComponent } from './project-item/project-item.component';
import { TasksService } from '../../../services/tasks.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [ProjectItemComponent, CommonModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
})
export class ProjectListComponent implements OnInit {
  projects: string[] = [];
  inbox!: string;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.inbox = this.tasksService.getProjects()[0];
    this.projects = this.tasksService.getProjects().slice(1);
  }
}
