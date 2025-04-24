import { Injectable } from '@angular/core';
import { IAddProductResponseDto, IGetSellerProductsDto } from '../model/product.dto';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import apiUrl from '../../../../misc/api.url';
import { ISellerProducts } from '../store/model';
import { GetSellerProducts, SummarizeProduct } from '../model/product.model';
import { MapperService } from './mapper.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http: HttpClient, private _mapper: MapperService) { }

  addProduct(addProductDto: FormData): Observable<IAddProductResponseDto> {
    console.log(`[ProductService] - addProduct`);
    return this._http.post<IAddProductResponseDto>(apiUrl.addProduct.url, addProductDto);
  }

  getSellerProducts(sellerId: string): Observable<GetSellerProducts> {
    console.log(`[ProductService] - getSellerProducts -seller id: ${sellerId}`);
    const url = apiUrl.getSellerProducts.url.replace('{userId}', sellerId)
    console.log(`[ProductService] - getSellerProducts - api ${url}`);
    return this._http.get<IGetSellerProductsDto>(url).pipe(
      map(dto=>this._mapper.mapToGetSellerProducts(dto)));
  }
}
