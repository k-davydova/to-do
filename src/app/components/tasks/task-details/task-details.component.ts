import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [
    CommonModule,
    ShortenPipe,
    FormsModule,
    ReactiveFormsModule,
    StartTaskDetailsComponent
  ],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss',
})
export class TaskDetailsComponent implements OnInit {
  task!: Task;
  taskForm!: FormGroup;
  index!: number;
  projectName: string = 'inbox';
  isSelected!: boolean;
  projects!: string[];
  isSent: boolean = false;

  constructor(private tasksService: TasksService) {

  }

  ngOnInit(): void {
    this.projects = this.tasksService.getProjects();

    this.tasksService.selectedTask.subscribe((task) => {
      this.task = task;

      this.taskForm.patchValue({
        title: task.title,
        description: task.description,
        project: this.projectName,
      });
    });

    this.taskForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      project: new FormControl([]),
    });

    this.tasksService.selectedTaskIndex.subscribe((index) => {
      this.index = index;
    });

    this.tasksService.selectedProjectName.subscribe((projectName) => {
      this.projectName = projectName;
    });

    this.tasksService.isTaskSelected.subscribe((isSelected) => {
      this.isSelected = isSelected;
    });
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
}
