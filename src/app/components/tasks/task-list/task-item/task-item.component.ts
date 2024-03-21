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
  imports: [FormsModule, CommonModule, ShortenPipe, CompletedTaskDirective],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent implements OnInit {
  @Input() task!: Task;
  @Input() index!: number;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.onChecked();
  }

  onDelete(event: Event) {
    event.stopPropagation();
    this.tasksService.deleteTask(this.index);
  }

  onSelectTask() {
    console.log(this.index);
    this.tasksService.selectTask(this.index);
  }

  private onChecked() {
    this.tasksService.checkedTask();
  }
}
