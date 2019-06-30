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

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  login(email:string,password:string): Observable<any>{
    var body={email:email,password:password}
    return this.http.post(base+'/login',JSON.stringify(body),httpOptions).pipe(map(this.extractData));
  }
}
