import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {
  
  constructor(private http: HttpClient) { }
  //after subscribing this method we get the the status code from backend 
  productList(productList:any):Observable<any>
  {
    
   return this.http.post("please write your api url here",productList)
  }
}
