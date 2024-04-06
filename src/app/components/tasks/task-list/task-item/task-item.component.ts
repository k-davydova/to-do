import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../../../models/task.model';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../../../../services/tasks.service';
import { CommonModule } from '@angular/common';
import { CompletedTaskDirective } from '../../../../directives/completed-task.directive';
import { ShortenPipe } from '../../../../pipes/shorten.pipe';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ShortenPipe,
    CompletedTaskDirective
  ],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Input() index!: number;
  @Input() projectName!: string;

  constructor(private tasksService: TasksService) {}

  onCheckedTask() {
    this.tasksService.checkedTask();
  }

  onSelectTask() {
    this.tasksService.getSelectedTask(this.task, this.index);
  }

  onDelete() {
    this.tasksService.deleteTask(this.projectName, this.index);
  }

}
