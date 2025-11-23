import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IUpdateProductActivationResponseDto, IProductFilterValueDto, IGetProductDetailResponseDto, IGetSellerProductsDto, IProductUpdateResponseDto, ISummarizeProductDto } from '../model/product.dto';
import { GetSellerProducts, ProductDetail, ProductStatus, SummarizeProduct } from '../model/product.model';
import { Observable } from 'rxjs';

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
        dto.imageToShow,
        null,
        null

      );

      return product;
    }

    /**
     * Convertion vers un objet GetSellerProducts
     * @param {IGetSellerProductsDto} dto - Reponse du backendend
     * @returns GetSellerProducts
     */
    mapToGetSellerProducts(dto: IGetSellerProductsDto): GetSellerProducts {
      var summarizeProducts = dto.sellerProducts.map(product=>this.mapToSummarizeProduct(product));
      return new GetSellerProducts(
        dto.responseMessage,
        summarizeProducts,
        dto.productQuantity
      )
    }

    /**
     * map un IGetProductDetailResponseDto en ProductDetail
     * @param {IProductDetailResponseDto} dto
     * @returns {ProductDetail}
     */
    mapToProductDetail(dto: IGetProductDetailResponseDto): ProductDetail {
      return new ProductDetail(
        dto.productId,
        dto.productName,
        dto.productCategory.categoryName,
        dto.productSoldPrice,
        dto.productPurchasePrice,
        dto.photoImagePath,
        dto.productBuyAt,
        dto.productSoldAt,
        dto.productStatus
      )
    }

    /**
     * Map une date en string ddMmYyyy
     * @param {Date} originalDate Date a mapper en string
     * @returns {string} Date au format dd/mm/Yyyy
     */
    mapDateToDdMmYyyy(originalDate: Date): string {

    // Si pas de date de définie
    if(originalDate === null)
      return originalDate;

    // regex pour tester les date au format  dd/mm/yyyy
    const regex = /^([0-2][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

    // Si date déja au format dd/mm/yyyy
    if(regex.test(originalDate.toString()))
      return originalDate.toString();

    // Récupération de la date au fomrat dd/mm/yyyy
    const day = String(originalDate.getDate()).padStart(2, '0');
    const month = String(originalDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = originalDate.getFullYear();


    return `${day}/${month}/${year}`;
    }

    /**
     * Map un boolean vers un statut de produit
     * @param {boolean} value - Statue true or false
     * @returns {string}
     */
    mapBooleanToProductStatus(value: boolean): string {
      return value === true ? ProductStatus.SOLD : ProductStatus.FOR_SALE
    }

    /**
     * map un status de produit vers un boolean
     * Si statut ProductStatus.SOLD => true sinon false
     * @param {string} status - Statut
     * @returns {boolean}
     */
    mapProductStatusToBoolean(status: string | undefined): boolean {
      if (status === undefined)
        return false;

      return status === ProductStatus.SOLD ? true : false;
    }

    /**
     * Map un formGroup vers IFilterProductInputsDto
     * @param {FormGroup} filterProductsFG
     * @returns { IProductFilterValueDto }
     */
    mapToIFilterProductInputsDto(filterProductsFG: FormGroup, sellerId: string): IProductFilterValueDto {
      const filterByProductNameValue = filterProductsFG.get('filterByName')?.value;
      const filterByCategoryValue = filterProductsFG.get('productCategory')?.value;
      const filterByPeriodeValue = filterProductsFG.get('dateRegisterSelect')?.value;
      const areSoldProductVisible = filterProductsFG.get('areSoldProductVisible')?.value;
      let categoryCode = null;

      if(filterByCategoryValue !== null && filterByCategoryValue !== undefined)
        categoryCode = filterByCategoryValue.code;

      return {
        sellerId: sellerId,
        filterByName: filterByProductNameValue,
        filterByCategoryCode: categoryCode,
        filterByRegisterPeriod: filterByPeriodeValue,
        areSoldProductVisible
      };
    }
  }
