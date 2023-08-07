import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css']
})
export class TodoCreateComponent {
  todoGroup : FormGroup;
  todoArray : FormArray;
  todoObj: {
    description: "",
    priority: "",
    date: null
  }

  constructor(private formBuilder : FormBuilder){}
  
  ngOnInit(): void {
    this.todoArray = this.formBuilder.array([]);
    this.todoGroup = this.formBuilder.group({ todoArrays: this.todoArray})
    this.addToDoRow();
  }

  addToDoRow(){
    const todoSubGroup = this.formBuilder.group({
      description: new FormControl<string>("", [Validators.required]),
      priority: new FormControl<string>("", [Validators.required]),
      due: new FormControl<Date>(new Date(), [Validators.required]),
    })
    this.todoArray.push(todoSubGroup);
  }

  @Output() addToDoOutput: EventEmitter<FormArray> = new EventEmitter();

  addToDo(){
    let arrayControl = this.todoGroup.get('todoArrays') as FormArray;
    this.addToDoOutput.emit(arrayControl);
    console.log(arrayControl.at(0).value)
  }


}
