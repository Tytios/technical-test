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
        tap(_ => this.messageService.add({severity:'success', summary: 'Todo list successfully loaded', key: 'homeMsg'})),
        catchError(this.handleHttpError<TaskItem[]>('getTasks', [])),
        // Sort the list of tasks by task validated last
        map(taskItems=>taskItems.sort(function(a,b){
          return (a.status === b.status) ? 0 : b.status ? -1 : 1;
        }))
      );
  }

  updateTaskItem(taskItem: TaskItem): Observable<any> {
    return this.http.put(this.taskItemUrl, taskItem, this.httpOptions).pipe(
      tap(_ => this.messageService.add({severity:'success', summary:'Task state updated', key: 'homeToast'})),
      catchError(this.handleHttpError<any>('updateTaskItem'))
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
