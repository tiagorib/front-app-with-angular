import { Component } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { Customer } from '../model/customer';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {

  constructor(private service: CustomerService){
  }

  ngOnInit(): void {
    this.saveCustomer();
  }

  customer: Customer = {
    idCustomer: '',
    firstNameCustomer: 'Jefferson',
    lastNameCustomer: 'Restani',
    birthdateCustomer: '21/04/1979',
    dateCreatedCustomer: '',
    monthlyIncomeCustomer: '1000',
    cpfCustomer: '80456061002',
    emailCustomer: 'jefferson@teste.com',
    passwordCustomer: '123456',
    statusCustomer: true
  }

  saveCustomer() {
    this.service.save(this.customer).subscribe(response => {
      console.log(response)
    })
  }

  /*saveCustomer() {
    
    const datePipe = new DatePipe('en-US');
    this.customer.birthdateCustomer = datePipe.transform(this.customer.birthdateCustomer, 'dd/MM/yyyy');
    
    
    this.service.save(this.customer).subscribe({next: () => {
    this.toast.success('O cliente '+ this.customer.firstNameCustomer +' '+ this.customer.lastNameCustomer +' foi cadastrado com sucesso!', 'Cadastro');      
    }, error: ex => {
      if (ex.error.errors) {
        ex.error.errors.forEach((element:any) => {
          this.toast.error(element.message, 'Erro');
        });
      } else {
        this.toast.error(ex.error.message, 'Erro');
      }
    }})
  }*/

}