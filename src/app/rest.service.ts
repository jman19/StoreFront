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

  signUp(email:string,password:string): Observable<loginResponse>{
    var body={email:email,password:password}
    return this.http.post<loginResponse>(base+'/signUp',JSON.stringify(body),httpOptions);
  }

  getProducts(hideOutOfStock:boolean): Observable<productResponse>{
    return this.http.get<productResponse>(base+'/product'+'?'+'hideOutOfStock='+hideOutOfStock,httpOptions);
  }

  getCart(bearer:string): Observable<cart>{
    var httpAuth={
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+bearer
      })
    };
    return this.http.get<cart>(base+'/cart',httpAuth);
  }

  addItemsToCart(items:addItems,bearer:string): Observable<statusMessage>{
    var httpAuth={
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+bearer
      })
    };
    return this.http.patch<statusMessage>(base+'/cart',JSON.stringify(items),httpAuth);
  }
}

export interface loginResponse{
  jwt:string,
  expires:number,
  code:number
}

export interface productResponse{
  products:product[]
}

export interface product{
  title:string,
  price:number,
  inventoryCount:number
}

export interface cart{
  items:{[key:string]:number},
  totalCost:number
}

export interface addItems{
  items:{[key:string]:number},
  set:boolean
}

export interface statusMessage{
  message:string,
  code:number
}