import { Component, OnInit } from '@angular/core';
import {Task} from '../../Task'
import { TaskService } from '../../service/task.service';



@Component({
  selector: 'app-taks',
  templateUrl: './taks.component.html',
  styleUrls: ['./taks.component.css']
})
export class TaksComponent implements OnInit {
tasks: Task[] = [];

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    //Like Promise
    this.taskService.getTasks().subscribe((tasks)=>(
      this.tasks = tasks
    ));
  }

  deleteTask(task:Task){
    this.taskService.deleteTask(task)
    .subscribe(
      ()=>(
      this.tasks = this.tasks.filter( (t) => {
        return t.id !== task.id 
      })
    ))
  }

  toggleReminder(task:Task){
    task.reminder = !task.reminder
    this.taskService.updateTaskReminder(task).subscribe();
  }

  addTask(task:Task){
    this.taskService.addTask(task).subscribe((task) =>(
    this.tasks.push(task)
    ))
  }

}
