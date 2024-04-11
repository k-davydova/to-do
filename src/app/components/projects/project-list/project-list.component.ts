import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ProjectItemComponent } from './project-item/project-item.component';
import { TasksService } from '../../../services/tasks.service';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil, timer } from 'rxjs';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    ProjectItemComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectListComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  projects: Project[] = [];
  isInputValue: boolean = false;

  projectForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  constructor(
    private tasksService: TasksService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.projects = this.tasksService.getProjects();

    this.tasksService.updateProjectList$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.projects = this.tasksService.getProjects();
      });
  }

  onAddProject() {
    const inputNameValue = this.projectForm.value.name;

    if (inputNameValue) {
      this.tasksService.addProject(inputNameValue);
    } else {
      this.isInputValue = true;
      timer(4000).subscribe(() => {
        this.isInputValue = false;
        this.cdr.markForCheck();
      });
    }
    this.projectForm.reset();
  }

  onSelectProject(projectName: string) {
    this.tasksService.getTasksForProject(projectName);
  }

  onDeteleProject(index: number) {
    this.tasksService.deleteProject(index);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
