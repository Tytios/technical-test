import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskItemService } from '../../services/task-item.service';
import { Location } from '@angular/common';
import { TaskItem } from 'src/app/shared/models/task-item.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {

  taskItem: TaskItem | undefined;

  constructor(
    private route: ActivatedRoute,
    private taskItemService: TaskItemService,
    private location: Location,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getTaskItem();
  }

  goBack():void{
    this.location.back();
  }

  private getTaskItem():void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.taskItemService.getTaskItem(id)
      .subscribe(
        (taskItem) => {
        this.taskItem = taskItem;
        },
        (error)=>{
          console.log(error);
          this.messageService.add({severity:'error', summary: `The task with id ${id} was not found`, key: 'detailMsg'})
        }
      );
  }

}
