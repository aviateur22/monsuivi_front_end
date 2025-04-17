import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IAddProductDto } from '../model/product.dto';

@Injectable({
  providedIn: 'root'
})
export class MapperService {

  constructor() { }

  /**
   * Map vers un IAddProductDto
   * @param data
   * @param selectProductImage
   * @param sellerId
   * @returns IAddProductDto
   */
    mapProductToAdd(data: FormGroup, selectProductImage: File, sellerId: number): FormData {
        const formData: FormData = new FormData();
        formData.append('productName', data.get('productName')?.value);
        formData.append('productPurchasePrice', data.get('productPurchasePrice')?.value);
        formData.append('productDesiredSoldPrice', data.get('productDesiredSoldPrice')?.value);
        formData.append('productCategory', data.get('productCategory')?.value.code);
        formData.append('sellerId', sellerId.toString());
        formData.append('uploadProductImage', selectProductImage);

        return formData;
    }
}
