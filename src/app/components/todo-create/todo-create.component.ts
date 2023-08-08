import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Input() selectedTask: {
    description: string,
    priority: string,
    due: string,
    completed: boolean,
    editing: boolean
  };

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.todoArray = this.formBuilder.array([]);
    this.todoGroup = this.formBuilder.group({ todoArrays: this.todoArray })
    this.addToDoRow();
  }

  ngOnChanges(){
    if (this.selectedTask == null) {
      console.log("null");
    } else if(this.selectedTask.editing){
      this.todoArray.removeAt(0);
      this.addEditToDoRow();
    }
  }

  addToDoRow() {
    const todoSubGroup = this.formBuilder.group({
      description: new FormControl<string>("", {
        validators: [Validators.required, Validators.minLength(5)],
        updateOn: 'change'
      }),
      priority: new FormControl<string>(this.priorityLevel, [Validators.required]),
      due: new FormControl<string>(new Date().toJSON().slice(0,10), [Validators.required, dateValidator]),
      completed: new FormControl<boolean>(false),
      editing: new FormControl<boolean>(false)
    })
    this.todoArray.push(todoSubGroup);
  }

  addEditToDoRow() {
    const todoSubGroup = this.formBuilder.group({
      description: new FormControl<string>(this.selectedTask.description, {
        validators: [Validators.required, Validators.minLength(5)],
        updateOn: 'change'
      }),
      priority: new FormControl<string>(this.selectedTask.priority, [Validators.required]),
      due: new FormControl<string>(this.selectedTask.due, [Validators.required, dateValidator]),
      completed: new FormControl<boolean>(this.selectedTask.completed),
      editing: new FormControl<boolean>(this.selectedTask.editing)
    })
    this.todoArray.push(todoSubGroup);
  }

  @Output() addToDoOutput: EventEmitter<FormArray> = new EventEmitter();

  addToDo() {
    let arrayControl = this.todoGroup.get('todoArrays') as FormArray;
    this.addToDoOutput.emit(arrayControl);
    console.log(arrayControl.at(0).value)
  }

  //not working
  cancelEdit(){
    this.selectedTask.editing = false; // send back to app
    this.todoArray.removeAt(0);
    this.addToDoRow();
  }
}

const dateValidator = (ctrl: AbstractControl) => {
  if (ctrl.value < new Date().toJSON().slice(0, 10)) {
    return { pastDate: true } as ValidationErrors;
  }
  return null;
}
