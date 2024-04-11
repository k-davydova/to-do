import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
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
import { Subject, takeUntil, timer } from 'rxjs';

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
  destroy$ = new Subject<void>();

  task!: Task;
  index!: number;
  projectName!: string;
  projects!: string[];

  isSelected = false;
  isSent = false;

  taskForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    project: new FormControl(),
  });

  constructor(
    private tasksService: TasksService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const storedProjectName = localStorage.getItem('selectedProjectName');
    this.projectName = storedProjectName ? storedProjectName : 'inbox';

    this.tasksService.selectedTask$
      .pipe(takeUntil(this.destroy$))
      .subscribe((task) => {
        this.task = task;

        this.taskForm.patchValue({
          title: task.title,
          description: task.description,
          project: this.projectName,
        });
      });

    this.tasksService.projectList$
      .pipe(takeUntil(this.destroy$))
      .subscribe((projects) => {
        this.projects = projects;
      });

    this.tasksService.selectedTaskIndex$
      .pipe(takeUntil(this.destroy$))
      .subscribe((index) => {
        this.index = index;
      });

    this.tasksService.selectedProjectName$
      .pipe(takeUntil(this.destroy$))
      .subscribe((projectName) => {
        this.projectName = projectName;
      });

    this.tasksService.isTaskSelected$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isSelected) => {
        this.isSelected = isSelected;
      });
  }

  onSubmit() {
    const title = this.taskForm.value.title;
    const description = this.taskForm.value.description;
    const project = this.taskForm.value.project;

    const updatedTask = {
      title: title || '',
      description: description || '',
      isChecked: this.task.isChecked,
    };

    this.tasksService.updateTask(
      updatedTask,
      this.projectName,
      this.index,
      project
    );

    this.isSent = true;

    timer(4000).subscribe(() => (this.isSent = false));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
