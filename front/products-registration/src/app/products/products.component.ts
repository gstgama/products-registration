import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.http.get('https://localhost:5001/api/product').subscribe(
      (data: any) => {
        console.log(data);
        this.products = data;
      },
      (error: any) => {
        console.error(error);
      }
    ).add();
  }

}
