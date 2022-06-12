import { HomeComponent } from './core/components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoDetailComponent } from './core/components/todo-detail/todo-detail.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'TODO List - Home' },
  { path: 'detail/:id', component: TodoDetailComponent,  title: 'TODO List - Task Detail' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
