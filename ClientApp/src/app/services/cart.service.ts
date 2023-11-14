import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProduct } from '../models/user-product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient ) {}
  url = "https://localhost:5001/cart";
  
  getCartItems(userMail:string):Observable<any>{
    return this.http.get<any>(this.url+`/${userMail}`);
  }
  insertItem(userMail:string, productId:number){
    return this.http.post<any>(this.url+`/${userMail}`, productId);
  }
  removeItem(userMail:string, productId:number){
    return this.http.delete<any>(this.url+`/${userMail}/${productId}`);
  }
  removeAllItems(userMail:string){
    return this.http.delete<any>(this.url+`/${userMail}`);
  }
}
