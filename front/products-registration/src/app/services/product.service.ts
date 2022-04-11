import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  baseURL = 'https://localhost:5001/api/product';

  getAllProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.baseURL)
      .pipe(take(1));
  }

  post(product: Product): Observable<Product> {
    return this.http
      .post<Product>(this.baseURL, product)
      .pipe(take(1));
  }

  delete(productId: number): Observable<any> {
    return this.http
      .delete(`${this.baseURL}/${productId}`)
      .pipe(take(1));
  }

}
