import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(private dataService: DataService) {}

  getFromLocalStorage(): Project[] {
    const storedProjects = localStorage.getItem('projects');

    return storedProjects ? JSON.parse(storedProjects) : [];
  }

  saveToLocalStorage(projects: Project[]): void {
    localStorage.setItem('projects', JSON.stringify(projects));
  }
}
