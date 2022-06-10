import { TaskItem } from 'src/app/shared/models/task-item.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskItemService {

  private taskItemUrl = 'api/taskItems';

  constructor(
    private http: HttpClient
  ) { }

  getTaskItems(): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(this.taskItemUrl)
      .pipe(
        catchError(this.handleHttpError<TaskItem[]>('getHeroes', []))
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
      //TODO add primeNG messages
      return of(result as T);
    };
  }
}
