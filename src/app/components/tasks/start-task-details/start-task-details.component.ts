import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-start-task-details',
  standalone: true,
  imports: [],
  templateUrl: './start-task-details.component.html',
  styleUrl: './start-task-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartTaskDetailsComponent {}
