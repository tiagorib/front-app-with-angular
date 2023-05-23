import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { Customer } from '../model/customer';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  success: boolean = false;
  errors!: String[];
  displayedColumns: string[] = ['idCustomer', 'firstNameCustomer', 'lastNameCustomer', 'cpfCustomer', 'birthdateCustomer', 'dateCreatedCustomer', 'monthlyIncomeCustomer', 'emailCustomer', 'statusCustomer', 'deleteCustomer'];
  ELEMENT_DATA: Customer[] = [];
  message: string = '';
  dataSource = new MatTableDataSource<Customer>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: CustomerService
  ){}

  ngOnInit(): void {
    this.listCustomer();
  }

  customer: Customer = {
    idCustomer: '',
    firstNameCustomer: '',
    lastNameCustomer: '',
    birthdateCustomer: '',
    dateCreatedCustomer: '',
    monthlyIncomeCustomer: '',
    cpfCustomer: '',
    emailCustomer: '',
    passwordCustomer: '',
    statusCustomer: true
  }

  saveCustomer() {
    const datePipe = new DatePipe('en-US');
    this.customer.birthdateCustomer = datePipe.transform(
      this.customer.birthdateCustomer, 'dd/MM/yyyy');
    
    this.service.save(this.customer).subscribe({next: response => {
      this.success = true;
      this.errors = [];
    //this.toast.success('O cliente '+ this.customer.firstNameCustomer +' '+ this.customer.lastNameCustomer +' foi cadastrado com sucesso!', 'Sucesso!!!');      
    }, error: ex => {
      if (ex.error.errors) {
        this.errors = ex.error.errors;
        this.success = false;
        ex.error.errors.forEach((element:any) => {
          //this.toast.error(element.message, 'Atenção!!!');                    
        });
      } else {
          this.success = false;
          this.errors = ex.error.errors;
        //this.toast.error(ex.error.message, 'Atenção!');
      }
    }})
  }

  listCustomer() {
    this.service.list().subscribe((response: any) => {
      this.ELEMENT_DATA = response.result as Customer[]; // Verifique o tipo e faça a conversão
      this.dataSource = new MatTableDataSource<Customer>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
    
  }

  deleteCustomer(customer: Customer) {
    if (window.confirm('Deseja realmente excluir este contato?')) {
      this.service.delete(customer.idCustomer).subscribe((response: any) => {
        this.message = response.result.result as string;
        window.alert(this.message);
        this.listCustomer();
      });
    }
  }

}