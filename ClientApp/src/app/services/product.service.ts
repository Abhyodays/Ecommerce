import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductPagination } from '../models/product-pagination.model';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient ) {}
  url = "https://localhost:5001/product/";

  getProducts(pageNumber:number, numberOfItems:number, searchKeyword:string, category:string):Observable<ProductPagination>{
    const params = new HttpParams()
    .set('page', pageNumber.toString())
    .set('items', numberOfItems.toString())
    .set('searchKey',searchKeyword)
    .set('category',category);
    const res = this.http.get<ProductPagination>(this.url,{params});
    return res;
  }
  Add(product: Product): Observable<any>{
    const res = this.http.post<any>(this.url, product);
    return res;
  }
  getById(id:number):Observable<Product>{
    const res = this.http.get<Product>(this.url+id);
    return res;
  }
  delete(id:number):Observable<any>{
    const res = this.http.delete<any>(this.url+id);
    console.log(res);
    return res;
  }
  edit(product:Product):Observable<any>{
    const res = this.http.put<any>(this.url, product);
    return res;
  }
}
