import { Injectable } from '@angular/core';
import { users } from './users';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class userService {

 
  constructor(private HttpClient: HttpClient) {

  }

  getEveryone(): Observable<users[]> {

    return this.HttpClient.get<users[]>( 'http://localhost:3000/users');

  }

  createUser(user): Observable<any> {
    
    const cudOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    
    return this.HttpClient.post('http://localhost:3000/users',users,cudOptions);
  }

  getTeachers():Observable<users[]>{
    return this.HttpClient.get<users[]>("http://localhost:3000/users?teacher=true");
  }

  getStudents():Observable<users[]>{
    return this.HttpClient.get<users[]>("http://localhost:3000/users?teacher=false");
  }

}