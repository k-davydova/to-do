import { Component } from '@angular/core';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskDetailsComponent } from './components/tasks/task-details/task-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TasksComponent,
    TaskDetailsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'task-tracker';
}
