import { Component, Input, OnInit } from '@angular/core';
import { TasksService } from '../../../../services/tasks.service';
import { SelectedDirective } from '../../../../directives/selected.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-item',
  standalone: true,
  imports: [SelectedDirective, CommonModule],
  templateUrl: './project-item.component.html',
  styleUrl: './project-item.component.scss',
})
export class ProjectItemComponent {
  @Input() projectName!: string;

  constructor(private tasksService: TasksService) {}

  onSelectProject() {
    this.tasksService.getTasksForProject(this.projectName);
  }
}
