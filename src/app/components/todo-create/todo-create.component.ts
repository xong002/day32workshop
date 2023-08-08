import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';


@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css']
})
export class TodoCreateComponent {
  todoGroup: FormGroup;
  todoArray: FormArray;
  todoObj: {
    description: "",
    priority: "",
    date: null
  }
  priorityLevel: string = "Low";

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.todoArray = this.formBuilder.array([]);
    this.todoGroup = this.formBuilder.group({ todoArrays: this.todoArray })
    this.addToDoRow();
  }

  addToDoRow() {
    const todoSubGroup = this.formBuilder.group({
      description: new FormControl<string>("", {
        validators: [Validators.required, Validators.minLength(5)],
        updateOn: 'change'
      }),
      priority: new FormControl<string>(this.priorityLevel, [Validators.required]),
      due: new FormControl<Date>(null, [Validators.required, dateValidator]),
      completed: new FormControl<boolean>(false)
    })
    this.todoArray.push(todoSubGroup);
  }

  @Output() addToDoOutput: EventEmitter<FormArray> = new EventEmitter();

  addToDo() {
    let arrayControl = this.todoGroup.get('todoArrays') as FormArray;
    this.addToDoOutput.emit(arrayControl);
    console.log(arrayControl.at(0).value)
  }

}

const dateValidator = (ctrl: AbstractControl) => {
  if (ctrl.value < new Date().toJSON().slice(0,10)){
    return { pastDate: true} as ValidationErrors;
  }
  return null;
}
