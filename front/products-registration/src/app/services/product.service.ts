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

}
