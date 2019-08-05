import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from './../environments/environment';

const base=environment.base;
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
    return this.http.post<loginResponse>(base+'/auth/login',JSON.stringify(body),httpOptions);
  }

  signUp(input:signUp): Observable<loginResponse>{
    return this.http.post<loginResponse>(base+'/auth/signUp',JSON.stringify(input),httpOptions);
  }

  getProducts(hideOutOfStock:boolean): Observable<productResponse>{
    return this.http.get<productResponse>(base+'/shop/product'+'?'+'hideOutOfStock='+hideOutOfStock,httpOptions);
  }

  getCart(bearer:string): Observable<cart>{
    var httpAuth={
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+bearer
      })
    };
    return this.http.get<cart>(base+'/user/cart',httpAuth);
  }

  addItemsToCart(items:addItems,bearer:string): Observable<statusMessage>{
    var httpAuth={
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+bearer
      })
    };
    return this.http.patch<statusMessage>(base+'/user/cart',JSON.stringify(items),httpAuth);
  }

  checkout(bearer:string): Observable<checkoutResponse>{
    var httpAuth={
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+bearer
      })
    };
    return this.http.patch<checkoutResponse>(base+'/user/cart/checkout',null,httpAuth)
  }

  //get basic product info such as price for a specific product
  getSpecificProduct(product:string): Observable<product>{
    return this.http.get<product>(base+'/shop/product/{{product}}',httpOptions);
  }

  //get user info like address
  getUserProfile(bearer:string): Observable<userInfo>{
    var httpAuth={
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+bearer
      })
    };
    return this.http.get<userInfo>(base+'/user',httpAuth);
  }

  //get order history
  getUserOrderHistory(bearer:string): Observable<orderHistoryList>{
    var httpAuth={
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+bearer
      })
    };
    return this.http.get<orderHistoryList>(base+'/user/orderHistory',httpAuth);
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

export interface checkoutResponse{
  message:string,
  total:number
}

export interface signUp{
  email:string,
  password:string,
  firstName:string,
  lastName:string,
  city:string,
  billingAddress:string,
  province:string,
  postalCode:string,
  phone:string
}

export interface userInfo{
  user:string,
  firstName:string,
  lastName:string,
  city:string,
  billingAddress:string,
  province:string,
  postalCode:string,
  phone:string
}

export interface orderHistory{
  email:string,
  firstName:string,
  lastName:string,
  city:string,
  billingAddress:string,
  province:string,
  postalCode:string,
  phone:string,
  fulfilled:boolean,
  created:Date,
  updatedOn:Date,
  items:{[key:string]:number},
  totalCost:number
}

export interface orderHistoryList{
  fulfillment:orderHistory[]
}