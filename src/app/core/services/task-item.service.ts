import { TaskItem } from 'src/app/shared/models/task-item.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap, Observable, of, toArray } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class TaskItemService {

  private taskItemUrl = 'api/taskItems';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getTaskItems(): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(this.taskItemUrl)
      .pipe(
        tap(_ =>
          this.messageService.add({severity:'success', summary: 'Todo list successfully loaded', key: 'homeMsg'})
        ),
        catchError(this.handleHttpError<TaskItem[]>('getTasks', [])),
        // Sort the list of tasks by task created first
        map(taskItems=>taskItems.sort(function(a,b){
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        })),
        // Sort the list of tasks by task validated last
        map(taskItems=>taskItems.sort(function(a,b){
          return (a.status === b.status) ? 0 : b.status ? -1 : 1;
        }))
      );
  }

  getTaskItem(id: number): Observable<TaskItem> {
    const url = `${this.taskItemUrl}/${id}`;
    return this.http.get<TaskItem>(url).pipe(
      tap(_ => this.messageService.add({severity:'success', summary:`Task with id : ${id} found`, key: 'detailMsg'})
    ));
  }

  updateTaskItem(taskItem: TaskItem): Observable<any> {
    taskItem.updated_at = new Date();
    return this.http.put(this.taskItemUrl, taskItem, this.httpOptions).pipe(
      tap(_ => this.messageService.add({severity:'success', summary:'Task state updated', key: 'homeToast'})),
      catchError(this.handleHttpError<any>('updateTaskItem'))
    );
  }

  addTaskItem(taskItem: TaskItem): Observable<TaskItem> {
    return this.http.post<TaskItem>(this.taskItemUrl, taskItem, this.httpOptions).pipe(
      tap((newTaskItem: TaskItem) => this.messageService.add({severity:'success', summary: `New Task Added with ID : ${newTaskItem.id}`, key: 'homeToast'}))
    );
  }

  deleteTaskItem(id: number): Observable<TaskItem> {
    const url = `${this.taskItemUrl}/${id}`;
    return this.http.delete<TaskItem>(url, this.httpOptions).pipe(
      tap(_ => this.messageService.add({severity:'success', summary:'Task Deleted', key: 'homeToast'})),
    );
  }

  /**
   * Custom error handler for http requests
   * @param operation string - Name of the operation that failed
   * @param result T - Optionnal value to return
   * @returns
   */
  private handleHttpError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.messageService.add({severity:'error', summary: `${operation} failed: ${error.message}`, key: 'homeMsg'})
      return of(result as T);
    };
  }
}
