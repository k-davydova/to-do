import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HighlightService {
  private selectedProject: HTMLElement | null = null;
  private selectedTask: HTMLElement | null = null;

  constructor() {}

  setProjectSelection(el: HTMLElement) {
    this.clearProjectSelection();
    this.selectedProject = el;
    this.selectedProject.classList.add('highlight');
  }

  clearProjectSelection() {
    if (this.selectedProject) {
      this.selectedProject.classList.remove('highlight');
      this.selectedProject = null;
    }
  }

  setTaskSelection(el: HTMLElement) {
    this.clearTaskSelection();
    this.selectedTask = el;
    this.selectedTask.classList.add('highlight');
  }

  clearTaskSelection() {
    if (this.selectedTask) {
      this.selectedTask.classList.remove('highlight');
      this.selectedTask = null;
    }
  }

}
