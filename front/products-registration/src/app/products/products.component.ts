import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products!: Product[];
  form!: FormGroup;
  modalRef?: BsModalRef;

  constructor(
    private service: ProductService,
    private modalService: BsModalService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getAllProducts();

    this.form = this.fb.group({
      product: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  get product(): any {
    return this.form.get('product');
  }

  get category(): any {
    return this.form.get('category');
  }

  get price(): any {
    return this.form.get('price');
  }

  getAllProducts(): void {
    this.service.getAllProducts().subscribe(
      (data: any) => {
        console.log(data);
        this.products = data;
      },
      (error: any) => {
        console.error(error);
      }
    ).add();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
