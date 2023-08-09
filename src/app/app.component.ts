import { Component, EventEmitter, Output } from '@angular/core';
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
    completed: boolean,
    editing: boolean
  }[] = [];

  selectedTask: {
    description: string,
    priority: string,
    due: string,
    completed: boolean,
    editing: boolean
  };

  ngOnInit() {
    this.taskList.push({
      description: "aaaaaaaaaaaaaaaaaa",
      priority: "High",
      due: "2023-08-08",
      completed: false,
      editing: false
    });
    this.taskList.push({
      description: "abbb",
      priority: "High",
      due: "2023-08-08",
      completed: false,
      editing: false
    })
  }

  addToDoList(event: FormArray) {
    let task = event.at(0).value; 
    let taskIndex = this.taskList.findIndex(t => t.description === task.description);
    console.log(taskIndex)

    if(taskIndex == -1){
    this.taskList.push(task)
    } else if(taskIndex >= 0) {
      console.log(">-1")
      this.taskList[taskIndex] = task
    }
  }

  markCompleted(event: string) {
    let taskIndex = this.taskList.findIndex(t => t.description === event);
    this.taskList[taskIndex].completed = true;
  }

  deleteTask(event: string) {
    let taskIndex = this.taskList.findIndex(t => t.description === event);
    this.taskList.splice(taskIndex, 1)
    console.log(this.taskList)
  }

  editTask(event: string) {
    this.selectedTask = this.taskList.find(t => t.description === event);
    this.selectedTask.editing = true;
  }

  cancelEditTask(event: any){
    let taskIndex = this.taskList.findIndex(t => t.description === event.description);
    this.taskList[taskIndex].completed = false;
    this.selectedTask = null;
  }

}
