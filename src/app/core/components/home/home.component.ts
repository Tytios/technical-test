import { TaskItem } from 'src/app/shared/models/task-item.model';
import { TaskItemService } from './../../services/task-item.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  taskItems: TaskItem[] = [];
  validatedTask: number = 0;

  constructor(private taskItemService: TaskItemService) { }

  ngOnInit(): void {
    this.getTaskItems();
  }

  private getTaskItems(): void {
    this.taskItemService.getTaskItems().subscribe(
      (taskItems) => {
        this.taskItems = taskItems;
        this.taskItems.forEach(taskItem => {
          taskItem.status ? this.validatedTask++ : null;
        });
        console.log(this.validatedTask)
      }
    );
  }

}
