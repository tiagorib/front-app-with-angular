import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerComponent } from './customer/customer.component';
import { CustomerService } from './service/customer.service';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { CategoryService } from './service/category.service';
import { ProductService } from './service/product.service';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    MenuComponent,
    HomeComponent,
    CategoryComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatDividerModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatSelectModule
  ],
  providers: 
  [
    CustomerService,
    DatePipe,
    CategoryService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
