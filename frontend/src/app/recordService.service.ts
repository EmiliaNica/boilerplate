import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { records } from './records'
import { Observable } from 'rxjs';

@Injectable()
export class recordService {

  constructor(private http: HttpClient) { }

  addEntry(entry): Observable<any> {
    const cudOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    return this.http.post('http://localhost:3000/records', records, cudOptions);
  }

  getEntriesForStudent(studID:number):Observable<records[]>{
    return this.http.get<records[]>('http://localhost:3000/records?studID='+studID);
  }

  getEntriesForTeacher(courseID:number):Observable<records[]>{
    return this.http.get<records[]>('http://localhost:3000/records?courseID='+courseID);
  }

  updateEntry(record:records):Observable<any>{
    return this.http.put('http://localhost:3000/records/'+record.id,record);
  }

}