import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProjectItemComponent } from './project-item/project-item.component';
import { TasksService } from '../../../services/tasks.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [ProjectItemComponent, CommonModule, FormsModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
})
export class ProjectListComponent implements OnInit, OnDestroy {
  @ViewChild('form', { static: false }) projectForm!: NgForm;

  projects: string[] = [];
  newProject!: string;
  isInputValue: boolean = false;

  projectsSub!: Subscription;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.projects = this.tasksService.getProjects();

    this.projectsSub = this.tasksService.updateProjectList$.subscribe(() => {
      this.projects = this.tasksService.getProjects();
    });
  }

  onAddProject() {
    const inputValue = this.projectForm.value.newProject?.trim();

    if (inputValue) {
      this.tasksService.addProject(inputValue);
    } else {
      this.isInputValue = true;
      setTimeout(() => (this.isInputValue = false), 4000);
    }

    this.projectForm.reset();
  }

  ngOnDestroy(): void {
    this.projectsSub.unsubscribe();
  }
}
