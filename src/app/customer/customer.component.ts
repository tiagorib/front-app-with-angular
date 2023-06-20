import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { Customer } from '../model/customer';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit {

  success: boolean = false;
  errors!: String[];
  displayedColumns: string[] = ['idCustomer', 'firstNameCustomer', 'lastNameCustomer', 'cpfCustomer', 'birthdateCustomer', 'dateCreatedCustomer', 'monthlyIncomeCustomer', 'emailCustomer', 'statusCustomer', 'deleteCustomer', 'findCustomer'];
  ELEMENT_DATA: Customer[] = [];
  message: string = '';
  dataSource = new MatTableDataSource<Customer>(this.ELEMENT_DATA);

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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('customerForm') customerForm!: NgForm;

  constructor(
    private service: CustomerService
  ){}

  ngOnInit(): void {
    this.listCustomer();
  }

  saveCustomer() {
    const handleSuccessSaveOrUpdate = (response: any) => {
      this.success = true;
      this.errors = [];
      this.customer = response.result as Customer;
      var date = this.customer.birthdateCustomer;
      var newDate = date.split("/").reverse().join("-");
      this.customer.birthdateCustomer = newDate;
      this.listCustomer();
      this.emptyForm();
    };

    const datePipe = new DatePipe('en-US');
    this.customer.birthdateCustomer = datePipe.transform(this.customer.birthdateCustomer, 'dd/MM/yyyy');
    if (this.customer.idCustomer) {
      this.service.update(this.customer).subscribe(handleSuccessSaveOrUpdate);
    } else {
      this.service.save(this.customer).subscribe(handleSuccessSaveOrUpdate);
    }
  }

  listCustomer() {
    this.service.list().subscribe((response: any) => {
      this.ELEMENT_DATA = response.result as Customer[];
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
        this.emptyForm();
      });
    }
  }

  findCustomer(customer: Customer) {
    this.service.findById(customer.idCustomer).subscribe((response: any) => {
      this.customer = response.result as Customer;
      var date = this.customer.birthdateCustomer;
      var newDate = date.split("/").reverse().join("-");
      this.customer.birthdateCustomer = newDate;
      this.success = false;
    });
  }

  emptyForm() {
    this.customerForm.reset();

    this.customer.idCustomer = '';
    this.customer.firstNameCustomer = '';
    this.customer.lastNameCustomer = '';
    this.customer.birthdateCustomer = '';
    this.customer.dateCreatedCustomer = '';
    this.customer.monthlyIncomeCustomer = '';
    this.customer.cpfCustomer = '';
    this.customer.emailCustomer = '';
    this.customer.passwordCustomer = '';
    this.customer.statusCustomer = true;
  }

}
