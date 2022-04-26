import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {


  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  dataSource!: MatTableDataSource<any>;
  displayedColumns: any = ['name', 'category', 'price', 'action'];

  form!: FormGroup;
  modalRef?: BsModalRef;
  products!: Product[];
  productModel!: Product;

  categories: any = [];
  uniqCategories: any = [];

  productId!: number;
  productName!: string;
  productCategory!: string;

  constructor(
    private service: ProductService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllProducts();

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

  get name(): any {
    return this.form.get('name');
  }

  get category(): any {
    return this.form.get('category');
  }

  get price(): any {
    return this.form.get('price');
  }

  // filterData($event: any) {
  //   this.dataSource.filter = $event.target.value;
  // }

  onChange($event: any) {
    if ($event.value.toLowerCase() !== 'all') {
      let filterData = _.filter(this.products, (item) => {
        return item.category.toLowerCase() == $event.value.toLowerCase();
      })
      this.dataSource = new MatTableDataSource(filterData);
    }
  }

  getAllProducts(): void {
    this.service.getAllProducts().subscribe(
      (data: any) => {
        this.products = data;
        for (let i = 0; i < this.products.length; i++) {
          let firstLetterCapitalized = data[i].category.substr(0, 1).toUpperCase();
          this.categories[i] = firstLetterCapitalized + data[i].category.substr(1);
        }
        this.uniqCategories = _.uniq(_.orderBy(this.categories));

        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.matSort;
        this.dataSource.paginator = this.paginator;
      },
      (error: any) => {
        console.error(error);
      }
    ).add();
  }

  addProduct(): void {
    if (this.form.valid) {
      this.productModel = { ... this.form.value };
      this.service.post(this.productModel).subscribe(
        () => {
          this.toastr.success("Product has been registrared", "Success");
          this.modalService.hide();
          setTimeout(() => {
            this.form.reset();
          }, 500);
          this.getAllProducts();
        },
        (error: any) => {
          console.error(error);
          this.toastr.error("An error has occorrured", "Error!");
        }
      ).add();
    }
  }

  openNewModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  openDeleteModal(template: TemplateRef<any>, event: any, productId: number, productName: string, productCategory: string): void {
    event.stopPropagation();
    this.productId = productId;
    this.productName = productName;
    this.productCategory = productCategory;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.modalRef?.hide();

    this.service.delete(this.productId).subscribe(
      (data: any) => {
        if (data.message) {
          this.toastr.success(`${this.productName} - (${this.productCategory}) has been deleted.`, 'Deleted');
          this.getAllProducts();
        }
      },
      (error: any) => {
        console.error(error);
        this.toastr.error(`Error trying to delete ${this.productName} - (${this.productCategory})`, 'Error');
      }
    ).add(() => { })
  }

  decline(): void {
    this.modalRef?.hide();
    setTimeout(() => {
      this.form.reset();
    }, 500);
  }

}
