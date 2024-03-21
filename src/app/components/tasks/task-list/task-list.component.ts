import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../../../services/tasks.service';
import { Task } from '../../../models/task.model';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskItemComponent, CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  @ViewChild('taskInput', { static: false }) taskInput?: ElementRef;

  tasks!: Task[];
  isSelected!: boolean;
  isCompletedTasks!: boolean;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasks = this.tasksService.getTasks();

    this.tasksService.taskChanged.subscribe(
      (tasks: Task[]) => (this.tasks = tasks)
    );
  }

  onAddTask() {
    const taskTitle = this.taskInput?.nativeElement.value;

    if (taskTitle.trim() !== '') {
      const newTask = new Task(taskTitle, '', false, 'inbox');

      this.tasksService.addTask(newTask);

      if (this.taskInput) {
        this.taskInput.nativeElement.value = '';
      }
    }
  }
}
