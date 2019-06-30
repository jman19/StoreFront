import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const base="http://localhost:8080";
const httpOptions={
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http:HttpClient) { }

  login(email:string,password:string): Observable<loginResponse>{
    var body={email:email,password:password}
    return this.http.post<loginResponse>(base+'/login',JSON.stringify(body),httpOptions);
  }
}

export interface loginResponse{
  jwt:string,
  expires:number,
  code:number
}
