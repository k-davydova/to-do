import { Component, OnDestroy, OnInit } from '@angular/core';
import { TasksService } from '../../../services/tasks.service';
import { Task } from '../../../models/task.model';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ShortenPipe } from '../../../pipes/shorten.pipe';
import { StartTaskDetailsComponent } from '../start-task-details/start-task-details.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [
    CommonModule,
    ShortenPipe,
    FormsModule,
    ReactiveFormsModule,
    StartTaskDetailsComponent,
  ],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss',
})
export class TaskDetailsComponent implements OnInit, OnDestroy {
  task!: Task;
  taskForm!: FormGroup;
  index!: number;
  projectName: string = 'inbox';
  isSelected!: boolean;
  projects!: string[];
  isSent: boolean = false;

  taskSub!: Subscription;
  indexSub!: Subscription;
  projectNameSub!: Subscription;
  isSelectedSub!: Subscription;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.projects = this.tasksService.getProjects();

    this.taskForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      project: new FormControl([]),
    });

    this.taskSub = this.tasksService.selectedTask$.subscribe((task) => {
      this.task = task;

      this.taskForm.patchValue({
        title: task.title,
        description: task.description,
        project: this.projectName,
      });
    });

    this.indexSub = this.tasksService.selectedTaskIndex$.subscribe((index) => {
      this.index = index;
    });

    this.projectNameSub = this.tasksService.selectedProjectName$.subscribe(
      (projectName) => {
        this.projectName = projectName;
      }
    );

    this.isSelectedSub = this.tasksService.isTaskSelected$.subscribe(
      (isSelected) => {
        this.isSelected = isSelected;
      }
    );
  }

  onSubmit() {
    const title = this.taskForm.value.title;
    const description = this.taskForm.value.description;
    const project = this.taskForm.value.project;

    const updatedTask = {
      title: title,
      description: description,
      isChecked: this.task.isChecked,
    };

    this.tasksService.updateTask(
      updatedTask,
      this.projectName,
      this.index,
      project
    );

    this.isSent = true;
    setTimeout(() => (this.isSent = false), 4000);
  }

  ngOnDestroy(): void {
    this.taskSub.unsubscribe();
    this.indexSub.unsubscribe();
    this.projectNameSub.unsubscribe();
    this.isSelectedSub.unsubscribe();
  }
}
