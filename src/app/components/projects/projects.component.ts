import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProjectListComponent } from './project-list/project-list.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectListComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {}
