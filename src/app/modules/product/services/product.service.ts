import { Injectable } from '@angular/core';
import { IAddProductResponseDto, IDesactivateProductDto, IDesactivateProductResponseDto, IGetProductDetailDto, IGetProductDetailResponseDto, IGetSellerProductsDto, IProductUpdateDto, IProductUpdateResponseDto } from '../model/product.dto';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import apiUrl from '../../../../misc/api.url';
import { ISellerProducts } from '../store/model';
import { GetSellerProducts, ProductDetail, SummarizeProduct } from '../model/product.model';
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
    const url = apiUrl.getSellerProducts.url.replace('{sellerId}', sellerId)
    console.log(`[ProductService] - getSellerProducts - api ${url}`);
    return this._http.get<IGetSellerProductsDto>(url).pipe(
      map(dto=>this._mapper.mapToGetSellerProducts(dto)));
  }

  desactivateProduct(desactivateProductDto: IDesactivateProductDto): Observable<IDesactivateProductResponseDto> {
    console.log(`[ProductService] - desactivateProduct - seller id: ${desactivateProductDto}`);
    return this._http.put<IDesactivateProductResponseDto>(apiUrl.desactivateProduct.url, desactivateProductDto);
  }

  getProductDetail(productDetail: IGetProductDetailDto):Observable<IGetProductDetailResponseDto> {
    console.log(`[ProductService] - getProductDetail - données: ${productDetail}`);
    let url = apiUrl.getProductDetail.url
    .replace('{productId}', productDetail.productId)
    .replace('{sellerId}', productDetail.sellerId);
    console.log(`[ProductService] - getProductDetail - url: ${url}`);

    return this._http.get<IGetProductDetailResponseDto>(url);
  }

  productUpdate(productUpdateDto: IProductUpdateDto): Observable<IProductUpdateResponseDto> {
    console.log(`[ProductService] - productUpdate - données: ${productUpdateDto}`);
    return this._http.put<IProductUpdateResponseDto>(apiUrl.productUpdate.url, productUpdateDto);
  }
}
