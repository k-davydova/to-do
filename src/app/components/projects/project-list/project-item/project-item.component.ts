import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortenPipe } from '../../../../pipes/shorten.pipe';
import { Project } from '../../../../models/project.model';

@Component({
  selector: 'app-project-item',
  standalone: true,
  imports: [CommonModule, ShortenPipe],
  templateUrl: './project-item.component.html',
  styleUrl: './project-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectItemComponent {
  @Input() project!: Project;
  @Input() index!: number;
  @Output() selectProject = new EventEmitter<string>();
  @Output() deteteProject = new EventEmitter<number>();

  constructor() {}

  onSelectProject() {
    this.selectProject.emit(this.project.name);
  }

  onDelete(event: Event) {
    event.stopPropagation();

    this.deteteProject.emit(this.index);
  }
}
