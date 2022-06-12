import { TaskItem } from 'src/app/shared/models/task-item.model';
import { TaskItemService } from './../../services/task-item.service';
import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { arrayMove } from 'src/app/shared/helpers/array-helpers';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  taskItems: TaskItem[] = [];
  validatedTaskCount: number = 0;

  constructor(
    private taskItemService: TaskItemService,
    private messageService: MessageService
    ) { }

  ngOnInit(): void {
    this.getTaskItems();
  }

  changeTodoState(taskItem: TaskItem){
    this.getValidatedTaskCount();
    this.taskItemService.updateTaskItem(taskItem).subscribe(
      ()=>{
        this.taskItems.forEach(
          (elem,index)=>{
            if(elem.id === taskItem.id){
              this.taskItems[index].updated_at =  new Date();
              if(taskItem.status){
                arrayMove(this.taskItems, index, this.taskItems.length)
              }else{
                arrayMove(this.taskItems, index, 0)
              }
            }
          }
        );
        this.taskItems = [...this.taskItems];
      }
    );
  }

  private getTaskItems(): void {
    this.taskItemService.getTaskItems().subscribe(
      (taskItems) => {
        this.taskItems = taskItems;
        this.getValidatedTaskCount();
      }
    );
  }

  private getValidatedTaskCount(): void{
    let validatedTaskCount = 0;
    this.taskItems.forEach(taskItem => {
      taskItem.status ? validatedTaskCount++ : null;
    });
    this.validatedTaskCount = validatedTaskCount;
  }

}
