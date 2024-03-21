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

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
  }
}
