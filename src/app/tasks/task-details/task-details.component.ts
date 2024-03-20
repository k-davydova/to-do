import { Component, OnDestroy, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../models/task.model';
import { Subscription } from 'rxjs';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ShortenPipe } from '../../pipes/shorten.pipe';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, ShortenPipe, FormsModule, ReactiveFormsModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss',
})
export class TaskDetailsComponent implements OnInit, OnDestroy {
  index: number = -1;
  task!: Task;
  isSelected!: boolean;
  selectedTaskSub!: Subscription;
  indexSub!: Subscription;

  taskForm!: FormGroup;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      description: new FormControl(''),
    });

    this.selectedTaskSub = this.tasksService.selectedTask.subscribe(
      (task: Task) => {
        this.task = task;
        this.taskForm.patchValue({
          description: task.description,
        });
      }
    );

    this.indexSub = this.tasksService.selectedTaskIndex.subscribe(
      (index: number) => {
        this.index = index;
      }
    );

    this.tasksService.isTaskSelected.subscribe((selected: boolean) => {
      this.isSelected = selected;
    });
  }

  onUpdateDescription() {
    const newDescription = this.taskForm.value.description;

    const newTask = {
      title: this.task.title,
      description: newDescription,
      isChecked: this.task.isChecked,
    };

    this.tasksService.updateDescription(this.index, newTask);
  }

  ngOnDestroy(): void {
    this.selectedTaskSub.unsubscribe();
    this.indexSub.unsubscribe();
  }
}
