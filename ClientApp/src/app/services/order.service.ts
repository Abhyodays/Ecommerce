import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartProduct } from '../models/cart-product.model';
import { OrderProduct } from '../models/order-product.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) { }
  url = "https://localhost:5001/order";

  getOrders(userMail: string): Observable<any> {
    return this.http.get<any>(this.url + `/${userMail}`);
  }

  AddOrders(userMail: string, cartItems: CartProduct[]) {
    const currentDate: Date = new Date();

    const day: number = currentDate.getDate();
    const month: number = currentDate.getMonth() + 1; 
    const year: number = currentDate.getFullYear();

    const formattedDate: string = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
    const orderProducts: OrderProduct[] = cartItems.map((cartProduct: CartProduct) => {
      const { id, product } = cartProduct;
      const userName = userMail;
      const orderedOn = formattedDate;
    
      return {
        userName,
        product,
        orderedOn,
      };
    });
    console.log("inside order-service:", orderProducts);
    return this.http.post<any>(this.url+"/addOrders",orderProducts);
  }

}
