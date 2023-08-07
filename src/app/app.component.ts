import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'day32workshop';

  taskList : {description : string, priority: string, due: Date}[] = [];

  addToDoList(event: FormArray){
    let task = event.at(0).value;
    console.log(task);
    this.taskList.push(task)
  }
}
