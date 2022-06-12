import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  addTaskForm : FormGroup = new FormGroup({});
  formIsSubmitted = false;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  addTask():void{
    this.formIsSubmitted = true;
    if(this.addTaskForm.valid){
      this.ref.close(this.addTaskForm.value);
    }
  }

  // Convenience getter for easy access to form controls
  get myForm(): any { return this.addTaskForm.controls; }

  private initForm():void{
    this.addTaskForm = new FormGroup({
      title : new FormControl('', Validators.required),
      description: new FormControl('')
    })
  }

}
