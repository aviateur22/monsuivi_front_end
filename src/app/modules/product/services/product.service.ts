import { Injectable } from '@angular/core';
import { IAddProductResponseDto, IDesactivateProductDto, IDesactivateProductResponseDto, IProductFilterValueDto, IFilterProductByMaxAgeDto, IGetProductDetailDto, IGetProductDetailResponseDto, IGetSellerProductsDto, IFilterProductByCategoryDto, IProductUpdateDto, IProductUpdateResponseDto } from '../model/product.dto';
import { map, Observable, of } from 'rxjs';
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

  getProductCategories(): Observable<IFilterProductByCategoryDto[]> {
    return of([
        { name: 'Livres', code: 'bk'},
        { name: 'Jeux', code: 'ga'},
        { name: 'Vétements', code: 'cl'}
      ]);
  }

  getFilterProductByMaxAge(): Observable<IFilterProductByMaxAgeDto []> {
    return of([
          { maxAgeLabel: "1 semaine", maxAgeValue: 1 },
          { maxAgeLabel: "1 mois", maxAgeValue: 2 },
          { maxAgeLabel: "2 mois", maxAgeValue: 3 },
          { maxAgeLabel: "3 mois", maxAgeValue: 4 }
      ]);
  }


  addProduct(addProductDto: FormData): Observable<IAddProductResponseDto> {
    console.log(`[ProductService] - addProduct`);
    return this._http.post<IAddProductResponseDto>(apiUrl.addProduct.url, addProductDto);
  }

  getSellerProducts(sellerId: string, areSoldProductVisible: boolean): Observable<GetSellerProducts> {
    console.log(`[ProductService] - getSellerProducts -seller id: ${sellerId}`);
    const url = apiUrl.getSellerProducts.url
      .replace('{sellerId}', sellerId)
      .replace('{areSoldProductVisible}', areSoldProductVisible.toString());

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

  filterSellerProducts(dto: IProductFilterValueDto): Observable<GetSellerProducts> {
    console.log(`[ProductService] - filterSellerProduct -dto: ${dto.filterByCategoryCode}`);
    const url = apiUrl.filterSellerProducts.url
     .replace('{sellerId}', dto.sellerId);
    return this._http.post<IGetSellerProductsDto>(url, dto).pipe(
      map(res => this._mapper.mapToGetSellerProducts(res)));
  }

  streamProductImage(imageName :string): Observable<Blob> {
    const url = apiUrl.streamImage.url.replace('{imagePath}', imageName);
    return this._http.get(url, { responseType: 'blob' });
  }
}
