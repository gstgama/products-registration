import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  constructor(
    private service: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.loadProduct();

    this.form = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(35)]],
      category: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(35)]],
      price: ['', [
        Validators.required,
        Validators.max(99999999)]]
    });
  }

  form!: FormGroup;
  product!: Product;

  get name(): any {
    return this.form.get('name');
  }

  get category(): any {
    return this.form.get('category');
  }

  get price(): any {
    return this.form.get('price');
  }

  loadProduct(): void{
    let productParamId = this.route.snapshot.paramMap.get('id');

    if(productParamId !== null){
      this.service.getProductById(+productParamId).subscribe(
        (product: Product) => {
          this.product = {... product};
          this.form.patchValue(this.product);
        },
        (error: any) => {
          console.error(error);
          this.toastr.error("It wasn't possible to load the product.", "Error!");
        },
      )
    }
  }

  updateProduct(){
    this.product = {id: this.product.id, ... this.form.value};

    this.service.put(this.product).subscribe(
      () => {
        this.toastr.success("Product has been updated succesfully", "Success")
        this.backToList();
      },
      (error: any) => {
        console.error(error);
        this.toastr.error("Error updating the product", "Error");
      }
    )
  }

  backToList(){
    this.router.navigate(['app']);
  }

}
