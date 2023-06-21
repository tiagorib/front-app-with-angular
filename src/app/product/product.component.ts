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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('productForm') productForm!: NgForm;

  constructor(
    private service: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.listProduct();
    this.categoryService.list().subscribe((response: any) => {
      this.categories = response.result as Category[];
    });
  }

  category: Category = {
    idCategory: '',
    nameCategory: '',
    descriptionCategory: ''
  }

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

  productDTO: ProductDTO = {
    idProduct: '',
    nameProduct: '',
    descriptionProduct: '',
    costPriceProduct: '',
    amountProduct: '',
    dateCreatedProduct: '',
    idCategory: ''
  }

  saveProduct() {
    const datePipe = new DatePipe('en-US');
    this.productDTO.dateCreatedProduct = datePipe.transform(this.productDTO.dateCreatedProduct, 'dd/MM/yyyy');
  
    const handleResponse = (response: any) => {
      this.success = true;
      this.errors = [];
      this.product = response.result as Product;
      this.product.dateCreatedProduct = this.product.dateCreatedProduct.split("/").reverse().join("-");
      this.listProduct();
      this.emptyForm();
    };
  
    if (this.productDTO.idProduct) {
      this.product = {
        ...this.product,
        ...this.productDTO,
        category: {
          idCategory: this.productDTO.idCategory,
          nameCategory: '',
          descriptionCategory: ''
        }
      };
  
      this.service.update(this.product).subscribe((response: any) => {
        handleResponse(response);
      });
    } else {
      const newProduct: ProductDTO = {
        ...this.productDTO,
        idProduct: '', 
        idCategory: this.productDTO.idCategory
      };
  
      this.service.save(newProduct).subscribe((response: any) => {
        handleResponse(response);
      });
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
      const { idProduct, nameProduct, descriptionProduct, costPriceProduct, amountProduct, dateCreatedProduct, category } = response.result as Product;
      this.productDTO = {
        idProduct,
        nameProduct,
        descriptionProduct,
        costPriceProduct,
        amountProduct,
        dateCreatedProduct: dateCreatedProduct.split("/").reverse().join("-"),
        idCategory: category?.idCategory
      };
      this.success = false;
    });
  }
  

  emptyForm() {
    this.productForm.resetForm();
    this.productDTO.idProduct = '';
  }
}
