import { Injectable } from '@angular/core';
import { IAddProductResponseDto } from '../model/product.dto';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import apiUrl from '../../../../misc/api.url';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http: HttpClient) { }

  addProduct(addProductDto: FormData): Observable<IAddProductResponseDto> {
    console.log(`[ProductService] - addProduct`)
    return this._http.post<IAddProductResponseDto>(apiUrl.addProduct.url, addProductDto);
  }
}
