import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'day32workshop';

  taskList: {
    description: string,
    priority: string,
    due: string,
    completed: boolean
  }[] = [];

  ngOnInit() {
    this.taskList.push({
      description: "aaaaaaaaaaaaaaaaaa",
      priority: "High",
      due: "2023-08-08",
      completed: false
    });
    this.taskList.push({
      description: "abbb",
      priority: "High",
      due: "2023-08-08",
      completed: false
    })
  }

  addToDoList(event: FormArray) {
    let task = event.at(0).value;
    console.log(task);
    this.taskList.push(task)
    console.log(this.taskList)
  }

  markCompleted(event: string) {
    let taskIndex = this.taskList.findIndex(t => t.description === event);
    this.taskList[taskIndex].completed = true;
  }

  deleteTask(event:string){
    let taskIndex = this.taskList.findIndex(t => t.description === event);
    this.taskList.splice(taskIndex, 1)
    console.log(this.taskList)
  }

}
