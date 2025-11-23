import { Injectable } from '@angular/core';
import { IAddProductResponseDto, IDesactivateProductDto, IUpdateProductActivationResponseDto, IProductFilterValueDto, IFilterProductByMaxAgeDto, IGetProductDetailDto, IGetProductDetailResponseDto, IGetSellerProductsDto, IFilterProductByCategoryDto, IProductUpdateDto, IProductUpdateResponseDto, IActivateProductDto } from '../model/product.dto';
import { map, Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import apiUrl from '../../../../misc/api.url';
import { GetSellerProducts } from '../model/product.model';
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

  getSellerProducts(sellerId: string): Observable<GetSellerProducts> {
    console.log(`[ProductService] - getSellerProducts -seller id: ${sellerId}`);
    const url = apiUrl.getSellerProducts.url
      .replace('{sellerId}', sellerId);

    console.log(`[ProductService] - getSellerProducts - api ${url}`);
    return this._http.get<IGetSellerProductsDto>(url).pipe(
      map(dto=>this._mapper.mapToGetSellerProducts(dto)));
  }

  desactivateProduct(desactivateProductDto: IDesactivateProductDto): Observable<IUpdateProductActivationResponseDto> {
    console.log(`[ProductService] - desactivateProduct - seller id: ${desactivateProductDto}`);
    return this._http.put<IUpdateProductActivationResponseDto>(apiUrl.desactivateProduct.url, desactivateProductDto);
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

    let params = new HttpParams();

    if (dto.filterByName != null) {
      params = params.set('filterByName', dto.filterByName);
    }

    if (dto.filterByCategoryCode != null) {
      params = params.set('filterByCategory', dto.filterByCategoryCode);
    }

    if (dto.filterByRegisterPeriod != null) {
      params = params.set('filterByRegisterPeriod', dto.filterByRegisterPeriod);
    }

    if (dto.areSoldProductVisible != null) {
      params = params.set('areSoldProductVisible', dto.areSoldProductVisible);
    }

    const url = apiUrl.filterSellerProducts.url
     .replace('{sellerId}', dto.sellerId);

    return this._http.get<IGetSellerProductsDto>(url, { params }).pipe(
      map(res => this._mapper.mapToGetSellerProducts(res)));
  }

  getDesactivateProducts(sellerId: string): Observable<GetSellerProducts> {
    console.log(`[ProductService] - getDesactivateProducts -  ${sellerId}`);
    let url = apiUrl.getDesactivateSellerProducts.url
    .replace('{sellerId}', sellerId);

    return this._http.get<IGetSellerProductsDto>(url)
    .pipe(
      map(dto=>this._mapper.mapToGetSellerProducts(dto))
    );
  }

  activateProducts(activateProduct: IActivateProductDto): Observable<IUpdateProductActivationResponseDto> {
    console.log(`[ProductService] - activateProducts -  ${activateProduct}`);
    return this._http.put<IUpdateProductActivationResponseDto>(apiUrl.activateProduct.url, activateProduct);
  }

  streamProductImage(imageName :string): Observable<Blob> {
    const url = apiUrl.streamImage.url.replace('{imagePath}', imageName);
    console.log(url)
    return this._http.get(url, { responseType: 'blob' });
  }
}
