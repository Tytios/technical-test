import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './core/services/in-memory-data.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//PrimeNg
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { KnobModule } from 'primeng/knob';
import { TagModule } from 'primeng/tag';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PanelModule } from 'primeng/panel';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';


import { MainContainerComponent } from './core/layouts/main-container/main-container.component';
import { HeaderComponent } from './core/layouts/header/header.component';
import { HomeComponent } from './core/components/home/home.component';
import { TodoDetailComponent } from './core/components/todo-detail/todo-detail.component';
import { AddTaskComponent } from './core/components/common/add-task/add-task.component';

@NgModule({
  declarations: [
    AppComponent,
    MainContainerComponent,
    HeaderComponent,
    HomeComponent,
    TodoDetailComponent,
    AddTaskComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    FormsModule,
    ReactiveFormsModule,
    //PrimeNg Module
    ButtonModule,
    CardModule,
    VirtualScrollerModule,
    MessagesModule,
    MessageModule,
    KnobModule,
    TagModule,
    CheckboxModule,
    ToastModule,
    PanelModule,
    TooltipModule,
    DynamicDialogModule,
    InputTextModule,
    InputTextareaModule,
    ConfirmPopupModule
  ],
  providers: [MessageService, DialogService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
