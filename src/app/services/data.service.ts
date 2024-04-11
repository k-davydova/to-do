import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  PROJECTS: Project[] = [
    {
      name: 'inbox',
      tasks: [
        new Task('Watch reels', '', true),
        new Task('Make to-do tracker', '', false),
      ],
      isRemovable: false,
    },
    {
      name: 'to-do',
      tasks: [
        new Task('Adding / removing tasks', '', true),
        new Task('Changing title and description', '', true),
        new Task(
          'Show different tasks',
          'The set of tasks depends on the selected project',
          true
        ),
        new Task(
          'Moving tasks',
          'All tasks can be moved between projects',
          true
        ),
        new Task(
          'Saving to localStorage',
          'All changes are recorded in localStorage and saved when the page is reloaded',
          true
        ),
        new Task("Adding personal project's folders", '', true),
        new Task('Tags', '', false),
        new Task('Change design', '', false),
      ],
      isRemovable: true,
    },
    {
      name: 'other',
      tasks: [
        new Task('Play xbox', '', false),
        new Task('Learn english', '', false),
        new Task('Read a book', '', true),
      ],
      isRemovable: true,
    },
  ];
}
