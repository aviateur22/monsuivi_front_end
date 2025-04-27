import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDesactivateProductResponseDto, IGetSellerProductsDto, ISummarizeProductDto } from '../model/product.dto';
import { GetSellerProducts, SummarizeProduct } from '../model/product.model';

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
    mapProductToAdd(data: FormGroup, selectProductImage: File, sellerId: string): FormData {
        const formData: FormData = new FormData();
        formData.append('productName', data.get('productName')?.value);
        formData.append('productPurchasePrice', data.get('productPurchasePrice')?.value);
        formData.append('productDesiredSoldPrice', data.get('productDesiredSoldPrice')?.value);
        formData.append('productCategory', data.get('productCategory')?.value.code);
        formData.append('sellerId', sellerId.toString());
        formData.append('uploadProductImage', selectProductImage);

        return formData;
    }

    /**
     * Map le dto recu du backend vers l'objet SummarizeProduct
     * @param dto ISummarizeProductDto
     * @returns SummarizeProduct
     */
    mapToSummarizeProduct(dto: ISummarizeProductDto): SummarizeProduct {
      const product = new SummarizeProduct(
        dto.id,
        dto.title,
        dto.productStatus.code,
        dto.productCategory.categoryName,
        dto.imageToShow
      );
      console.log(`[MapperService] - mapToSummarizeProduct - product ${product}`);

      return product;
    }

    /**
     * Convertion vers un objet GetSellerProducts
     * @param {IGetSellerProductsDto} dto - Reponse du backendend
     * @returns GetSellerProducts
     */
    mapToGetSellerProducts(dto: IGetSellerProductsDto): GetSellerProducts {
      var summarizeProducts = dto.sellerProducts.map(product=>this.mapToSummarizeProduct(product));

      console.log(`[MapperService] - mapToGetSellerProducts - products ${summarizeProducts}`);
      return new GetSellerProducts(
        dto.responseMessage,
        summarizeProducts
      )
    }
}
