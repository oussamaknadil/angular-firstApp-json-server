import { Task } from './../../models/task';
import { TaskService } from './../../services/task.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
 
  tasks : Task[]=[];
  resultTasks : Task[]=[];

  newTask :Task ={
    label:"",
    completed:false
  }

  editeForm: boolean=false;
  searchForm :boolean=false;
  search="";

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTastks()
  }

  getTastks(){
    this.taskService.findAll().subscribe(
      tasks => {
        this.resultTasks=this.tasks=tasks;
        
      }
    )
  }

  deleteTask(id:any){
    this.taskService.delete(id).subscribe(
       ()=>{
         this.tasks=this.tasks.filter(task => task.id != id)
         this.resultTasks=this.tasks
       }
    )
  }

  addTask(){
    console.log("test")
    this.taskService.add(this.newTask).subscribe(
      (task)=>{
        this.tasks=[task,...this.tasks]
        this.resultTasks=this.tasks
        this.resetNewTask();

      }
    )
  }

  resetNewTask(){
    this.newTask ={
      label:"",
      completed:false
    }
  }

  complatedToggle(task:Task){
    this.taskService.isComplated(task).subscribe(
        ()=>{
          task.completed = !task.completed
          this.resultTasks=this.tasks
        }
    )
  }

  edit(task:Task){
    this.newTask=task;
    this.editeForm=true;
  }

  updateTask(){
    this.taskService.update(this.newTask).subscribe(
      task =>{
        this.editeForm=false;
        this.resultTasks=this.tasks
        this.resetNewTask();
      }
        
    )
        
  }

  searchTasks(){
    this.resultTasks = this.tasks.filter((task)=> task.label.toLowerCase().includes(this.search.toLowerCase()))
  }

  switchFrom(){
    this.searchForm=!this.searchForm;
  }
}
