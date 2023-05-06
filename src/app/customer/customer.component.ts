import { Component } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { Customer } from '../model/customer';

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
    firstNameCustomer: 'abcd',
    lastNameCustomer: 'abcd',
    birthdateCustomer: '20/09/1983',
    dateCreatedCustomer: '',
    monthlyIncomeCustomer: '10',
    cpfCustomer: '50876423063',
    emailCustomer: 'abcd@teste.com',
    passwordCustomer: '123',
    statusCustomer: true
  }

  saveCustomer () {
    this.service.save(this.customer).subscribe(response => {
      console.log(response)
    })
  }

}