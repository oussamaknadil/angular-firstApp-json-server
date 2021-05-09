import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  API_URL="http://localhost:1000/tasks/"
  constructor(private http:HttpClient) { }

  findAll(){
    return this.http.get<Task[]>(this.API_URL);
  }

  delete(id:number){
    return this.http.delete(this.API_URL+id);
  }

  add(task:Task){
    return this.http.post<Task>(this.API_URL,task);
  }

  isComplated(task:Task){
    return this.http.patch(this.API_URL+task.id,{completed : !task.completed});
  }

  update(task:Task){
    return this.http.put(this.API_URL+task.id,task);
  }

  
}
