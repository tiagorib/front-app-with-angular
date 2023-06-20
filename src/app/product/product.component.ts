import { Component, ViewChild } from '@angular/core';
import { Product, ProductDTO } from '../model/product';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProductService } from '../service/product.service';
import { DatePipe } from '@angular/common';
import { Category } from '../model/category';
import { CategoryService } from '../service/category.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  success: boolean = false;
  errors!: String[];
  displayedColumns: string[] = ['idProduct', 'nameProduct', 'descriptionProduct', 'costPriceProduct', 'amountProduct', 'dateCreatedProduct', 'category', 'deleteProduct', 'findProduct'];
  ELEMENT_DATA: Product[] = [];
  message: string = '';
  dataSource = new MatTableDataSource<Product>(this.ELEMENT_DATA);

  categories: Category[] = [];

  product: Product = {
    idProduct: '',
    nameProduct: '',
    descriptionProduct: '',
    costPriceProduct: '',
    amountProduct: '',
    dateCreatedProduct: '',
    category: {
      idCategory: '',
      nameCategory: '',
      descriptionCategory: ''
    }
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('productForm') productForm!: NgForm;

  constructor(
    private service: ProductService,
    private categoryService: CategoryService
  ){}

  ngOnInit(): void {
    this.listProduct();
    this.categoryService.list().subscribe((response: any) => {
      this.categories = response.result as Category[];
    });
  }

  saveProduct() {
    const datePipe = new DatePipe('en-US');
    this.product.dateCreatedProduct = datePipe.transform(this.product.dateCreatedProduct, 'dd/MM/yyyy');

    const handleSuccessSaveOrUpdate = (response: any) => {
      this.success = true;
      this.errors = [];
      this.product = response.result as Product;
      var date = this.product.dateCreatedProduct;
      var newDate = date.split("/").reverse().join("-");
      this.product.dateCreatedProduct = newDate;
      this.listProduct();
      this.emptyForm();
    };

    const productDTO: ProductDTO = {
      idProduct: this.product.idProduct,
      nameProduct: this.product.nameProduct,
      descriptionProduct: this.product.descriptionProduct,
      costPriceProduct: this.product.costPriceProduct,
      amountProduct: this.product.amountProduct,
      dateCreatedProduct: this.product.dateCreatedProduct,
      idCategory: this.product.category.idCategory
    };

    if (this.product.idProduct) {
      this.service.update(productDTO).subscribe(handleSuccessSaveOrUpdate);
    } else {
      this.service.save(productDTO).subscribe(handleSuccessSaveOrUpdate);
    }
  }

  listProduct() {
    this.service.list().subscribe((response: any) => {
      this.ELEMENT_DATA = response.result as Product[];
      this.dataSource = new MatTableDataSource<Product>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });

  }

  deleteProduct(product: Product) {
    if (window.confirm('Deseja realmente excluir este produto?')) {
      this.service.delete(product.idProduct).subscribe((response: any) => {
        this.message = response.result.result as string;
        window.alert(this.message);
        this.listProduct();
      });
    }
  }

  findProduct(product: Product) {
    this.service.findById(product.idProduct).subscribe((response: any) => {
      this.product = response.result as Product;
      var date = this.product.dateCreatedProduct;
      var newDate = date.split("/").reverse().join("-");
      this.product.dateCreatedProduct = newDate;
      this.product.category = this.product.category;
      this.success = false;
    });
  }

  emptyForm() {
    this.productForm.reset();

    this.product = {
      idProduct: '',
      nameProduct: '',
      descriptionProduct: '',
      costPriceProduct: '',
      amountProduct: '',
      dateCreatedProduct: '',
      category: {
        idCategory: '',
        nameCategory: '',
        descriptionCategory: ''
      }
    };
  }
}
