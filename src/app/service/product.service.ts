import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api_config';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url: string = API_CONFIG.urlApi;

  constructor(private http: HttpClient) { }

  save(product: Product) : Observable<Product[]> {
    return this.http.post<Product[]>(this.url+'/product/create', product);
  }

  list() : Observable<Product[]> {
    return this.http.get<Product[]>(this.url+'/product/list');
  }

  delete(idProduct: any): Observable<Product> {
    return this.http.delete<Product>(`${this.url}/product/delete/${idProduct}`);
  }

  findById(idProduct: any): Observable<Product> {
    return this.http.get<any>(`${this.url}/product/findProduct/${idProduct}`);
  }
  //Adjust url
  update(product: Product): Observable<Product[]> {
    return this.http.put<Product[]>(this.url+`/product/update`, product);
  }

}