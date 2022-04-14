import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
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

  displayedColumns: any = ['name', 'category', 'price', 'action'];
  dataSource!: MatTableDataSource<any>;
  apiResponse!: Product[];

  productModel!: Product;
  products!: Product[];
  form!: FormGroup;
  modalRef?: BsModalRef;

  productId!: number;
  productName!: string;
  productCategory!: string;

  constructor(
    private service: ProductService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllProducts();

    this.form = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  get name(): any { //"productt" because already exists a "product" AQUI É O BACKUP ASOKDOSAKDOASK
    return this.form.get('name');
  }

  get category(): any {
    return this.form.get('category');
  }

  get price(): any {
    return this.form.get('price');
  }

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }

  onChange($event: any) {
    let filterData = _.filter(this.apiResponse, (item) => {
      return item.category.toLowerCase() == $event.value.toLowerCase();
    })
    this.dataSource = new MatTableDataSource(filterData);
  }

  getAllProducts(): void {
    this.spinner.show();

    this.service.getAllProducts().subscribe(
      (data: any) => {
        this.products = data;

        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.matSort;
        this.apiResponse = data;
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
          this.toastr.success("Product registrated with success", "Success");
          this.modalService.hide();
          setTimeout(() => {
            this.form.reset();
          }, 500);
          this.getAllProducts();
        },
        (error: any) => {
          console.error(error);
          this.toastr.error("An error happened", "Error!");
        }
      ).add();
    }
  }

  openNewModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
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
  }

}
