import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { courses } from "./courses"

@Injectable()
export class courseService {

  constructor(private http: HttpClient) { }

  getFreeCourses(): Observable<courses[]> {
    return this.http.get<courses[]>('http://localhost:3000/courses?teachID=0');
  }
  getCourseForTeacher(teachID: number): Observable<courses> {
    return this.http.get<courses>('http://localhost:3000/courses?teachID=' + teachID);
  }
  getCourses(): Observable<courses[]> {
    return this.http.get<courses[]>('http://localhost:3000/courses');
  }
  getCourseById(id:number):Observable<courses>{
    return this.http.get<courses>('http://localhost:3000/courses?teachID='+id);
  }
  updateCourse(courses:courses): Observable<any>
  {
    const cudOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put('http://localhost:3000/courses/'+courses.id,courses);
  }



}