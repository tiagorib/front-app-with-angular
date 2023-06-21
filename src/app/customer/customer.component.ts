import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from '../model/customer';
import { CustomerService } from '../service/customer.service';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroupDirective } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit{
  success: boolean = false;
  errors!: String[];
  displayedColumns: string[] = [
'idCustomer',
'firstNameCustomer',
'lastNameCustomer',
'cpfCustomer',
'birthdateCustomer',
'dateCreatedCustomer',
'monthlyIncomeCustomer',
'emailCustomer',
'statusCustomer',
'deleteCustomer',
'findCustomer'
];
  ELEMENT_DATA: Customer[] = [];
  dataSource = new MatTableDataSource<Customer>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;


  constructor(
    private service: CustomerService
    
    ){}
  
ngOnInit(): void {
  this.listCustomer();}

  customer: Customer = {
    idCustomer:'',
    firstNameCustomer: '',
    lastNameCustomer: '',
    cpfCustomer: '',
    birthdateCustomer: '',
    dataCreatedCustomer: '',
    statusCustomer: true,
    monthlyIncomeCustomer: '',
    emailCustomer: '',
    passwordCustomer: ''
}

cleanForms(){
  this.customer = 
  {
    idCustomer:'',
    firstNameCustomer: '',
    lastNameCustomer: '',
    cpfCustomer: '',
    birthdateCustomer: '',
    dataCreatedCustomer: '',
    statusCustomer: true,
    monthlyIncomeCustomer: '',
    emailCustomer: '',
    passwordCustomer: ''
}

}
saveCustomer() {
  const datePipe = new DatePipe('en-US');
  this.customer.birthdateCustomer = datePipe.transform(
    this.customer.birthdateCustomer, 'dd/MM/yyyy');
  
  this.service.save(this.customer).subscribe({next: response => {
    this.success = true;
    this.errors = [];
  },
  complete: () => {
    this.cleanForms()
    this.listCustomer();
  },
  error: ex => {
    if (ex.error.errors) {
      this.errors = ex.error.errors;
      this.success = false;
      ex.error.errors.forEach((element:any) => {                   
      });
    } else {
        this.success = false;
        this.errors = ex.error.errors;
    }
  }
})
}

listCustomer() {
  this.service.list().subscribe((response: any) => {
    this.ELEMENT_DATA = response.result as Customer[];
    this.dataSource = new MatTableDataSource<Customer>(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
  });
}

deleteCustomer(idCustomer: Customer) {
  if (window.confirm('Deseja realmente excluir este contato?')) {
  this.service.delete(idCustomer).subscribe({
    next: () => {
      // Remover o cliente excluído da lista
      this.ELEMENT_DATA = this.ELEMENT_DATA.filter(customer => customer.idCustomer !== idCustomer);
      // Atualizar a fonte de dados da tabela
      this.dataSource.data = this.ELEMENT_DATA;
      window.alert('Cliente deletado com sucesso!');
      this.listCustomer();
    },
    error: (error) => {
      console.error(error);
    }
  });}
}
  
  findCustomer(){
    this.service.getCustomer(this.customer.idCustomer).subscribe((response: any) => {
      this.customer = response.result as Customer;
      var date = this.customer.birthdateCustomer;
      var newDate = date.split("/").reverse().join("_");
      this.customer.birthdateCustomer = newDate;
    });
  }
  }