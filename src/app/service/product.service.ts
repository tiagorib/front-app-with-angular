import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api_config';
import { HttpClient } from '@angular/common/http';
import { Product, ProductDTO } from '../model/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url: string = API_CONFIG.urlApi;

  constructor(private http: HttpClient) { }

  save(productDTO: ProductDTO) : Observable<Product[]> {
    return this.http.post<Product[]>(this.url+'/product/create', productDTO);
  }

  list() : Observable<Product[]> {
    return this.http.get<Product[]>(this.url+'/product/list');
  }

  delete(idProduct: string): Observable<Product> {
    return this.http.delete<Product>(`${this.url}/product/delete/${idProduct}`);
  }

  findById(idProduct: string): Observable<Product> {
    return this.http.get<any>(`${this.url}/product/findProduct/${idProduct}`);
  }

  update(productDTO: ProductDTO): Observable<Product[]> {
    return this.http.put<Product[]>(this.url+'/product/update', productDTO);
  }

}
