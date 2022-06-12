import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { TaskItem } from 'src/app/shared/models/task-item.model';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const taskItems:TaskItem[]  = [{
        id: 12,
        title: 'Buy an apple' ,
        description: 'A very rare product',
        status: true,
        created_at: new Date('2022-06-05 23:00:00'),
        updated_at: undefined,
      },
      {
        id: 13,
        title: 'Do my technical test',
        description: 'Maybe not so easy',
        status: false,
        created_at: new Date('2022-06-07  18:00:00'),
        updated_at: undefined,
      },
      {
        id: 14,
        title: 'Buy flowers for my lover',
        description: 'I really must don\'t forget it',
        status: false,
        created_at: new Date('2022-06-04 8:00:00'),
        updated_at: undefined,
      },
      {
        id: 19,
        title: 'Finish first at every Enlisted battle',
        description: 'The goal of every fps players',
        status: false,
        created_at: new Date('2022-06-02 04:00:00'),
        updated_at: undefined,
      },
      {
        id: 20,
        title: 'Be a better man',
        description: 'Everyone should aspire to be',
        status: true,
        created_at: new Date('2022-06-11 15:00:00') ,
        updated_at: undefined,
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
