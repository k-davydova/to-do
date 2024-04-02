import { Component, Input, OnInit } from '@angular/core';
import { TasksService } from '../../../../services/tasks.service';
import { CommonModule } from '@angular/common';
import { ShortenPipe } from '../../../../pipes/shorten.pipe';
import { HighlightDirective } from '../../../../directives/highlight.directive';

@Component({
  selector: 'app-project-item',
  standalone: true,
  imports: [CommonModule, ShortenPipe, HighlightDirective],
  templateUrl: './project-item.component.html',
  styleUrl: './project-item.component.scss',
})
export class ProjectItemComponent {
  @Input() projectName!: string;
  @Input() index!: number;

  constructor(private tasksService: TasksService) {}

  onSelectProject() {
    this.tasksService.getTasksForProject(this.projectName);
  }

  onDelete(event: Event) {
    event.stopPropagation();

    this.tasksService.deleteProject(this.index);
  }
}
