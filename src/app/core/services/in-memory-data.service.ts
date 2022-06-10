import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { TaskItem } from 'src/app/shared/models/task-item.model';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const taskItems = [{
      id: 12,
      description: 'Buy an apple',
      status: true
    },
    {
      id: 13,
      description: 'Do my technical test',
      status: false
    },
    {
      id: 14,
      description: 'Buy flowers for my lover',
      status: false
    },
    {
      id: 19,
      description: 'Finish first at every Enlisted battle',
      status: false
    },
    {
      id: 20,
      description: 'Be a better man',
      status: true
    }
    ];
    return {
      taskItems
    };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(taskItems: TaskItem[]): number {
    return taskItems.length > 0 ? Math.max(...taskItems.map(taskItem => taskItem.id)) + 1 : 11;
  }
}
