import { TaskItem } from 'src/app/shared/models/task-item.model';
import { TaskItemService } from './../../services/task-item.service';
import { Component, OnInit } from '@angular/core';
import { arrayMove } from 'src/app/shared/helpers/array-helpers';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddTaskComponent } from '../common/add-task/add-task.component';
import { ConfirmationService, MessageService } from 'primeng/api';

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
    public dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
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

  addTask(): void {
    const ref = this.dialogService.open(AddTaskComponent, {
      header: 'Adding a new task',
      width: '70%'
    });
    ref.onClose.subscribe((taskItem: TaskItem) => {
      if (taskItem) {
        taskItem.created_at = new Date();
        taskItem.status = false;
        this.taskItemService.addTaskItem(taskItem).subscribe(
          (newTaskItem) => {
            this.taskItems.splice(0, 0, newTaskItem);
            this.taskItems = [...this.taskItems];
          },
          (error) => {
            console.log(error);
            this.messageService.add({
              severity: 'error', summary: `The new task was not added`, key: 'homeToast'
            })
          }
        );
      }
    });
  }

  private deleteItemTask(taskItem:TaskItem){
    this.taskItemService.deleteTaskItem(taskItem.id).subscribe(
      ()=>{
        this.taskItems = this.taskItems.filter(elem => elem !== taskItem);
        this.getValidatedTaskCount();
      },
      (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error', summary: `The new task was not deleted`, key: 'homeToast'
        })
      }
    )
  }
  confirm(event: Event, taskItem:TaskItem) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Are you sure do delete the task?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.deleteItemTask(taskItem);
        },
        reject: () => {

        }
    });
  }


  private sortTaskItemsByCreatedDate():void{
    this.taskItems.sort(function(a,b){
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    })
    this.taskItems = [...this.taskItems];
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
