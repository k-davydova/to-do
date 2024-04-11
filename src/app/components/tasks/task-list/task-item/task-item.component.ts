import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Task } from '../../../../models/task.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ShortenPipe } from '../../../../pipes/shorten.pipe';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [FormsModule, CommonModule, ShortenPipe],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Input() index!: number;
  @Input() projectName!: string;

  @Output() checkedTask = new EventEmitter<void>();
  @Output() selectTask = new EventEmitter<{ task: Task; index: number }>();
  @Output() deleteTask = new EventEmitter<{
    projectName: string;
    index: number;
  }>();

  constructor() {}

  onCheckedTask() {
    this.checkedTask.emit();
  }

  onSelectTask() {
    this.selectTask.emit({ task: this.task, index: this.index });
  }

  onDelete(event: Event) {
    event.preventDefault();
    this.deleteTask.emit({ projectName: this.projectName, index: this.index });
  }
}
