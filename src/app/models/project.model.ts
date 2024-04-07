import { Task } from './task.model';

export interface Project {
  name: string;
  tasks: Task[];
}
