import { Category } from './../model/category';
import { Component, ViewChild } from '@angular/core';
import { Product } from '../model/product';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProductService } from '../service/product.service';
import { DatePipe } from '@angular/common';
import { CategoryService } from '../service/category.service';

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
  category!: Category;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

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

  product: Product = {
    idProduct: '',
    nameProduct: '',
    descriptionProduct: '',
    costPriceProduct: '',
    amountProduct: '',
    dateCreatedProduct: '',
    category: this.category,
    idCategory: ''
  }

  saveProduct() {    
    const datePipe = new DatePipe('en-US');
    this.product.dateCreatedProduct = datePipe.transform(this.product.dateCreatedProduct, 'dd/MM/yyyy');
    
    this.service.save(this.product).subscribe((response: any) => {
      this.success = true;
      this.errors = [];
      this.product = response.result as Product;       
      var date = this.product.dateCreatedProduct;
      var newDate = date.split("/").reverse().join("-");
      this.product.dateCreatedProduct = newDate; 
      this.listProduct();   
    });
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
      this.product.idCategory = this.product.category.idCategory  
      var date = this.product.dateCreatedProduct;
      console.log(this.product)
      var newDate = date.split("/").reverse().join("-");
      this.product.dateCreatedProduct = newDate;
    });
  }

}
