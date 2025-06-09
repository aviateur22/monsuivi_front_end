import { Injectable } from '@angular/core';
import { IFilterProductInputsDto } from '../model/product.dto';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private _productService: ProductService) { }

  canProductsBeFiltered(dto: IFilterProductInputsDto): void | string {

    this._productService.
  }
 }
