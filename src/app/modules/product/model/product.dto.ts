import { IResponseMessage } from "../../share/model/share.dto"


/**
 * Données pour déposé un nouveau produit
 */
export interface IAddProductDto {
  uploadProductImage: File,
  productName: string,
  productPurchasePrice: number,
  productDesiredSoldPrice: number,
  productCategory: string,
  sellerId: number
}

/**
 * Reponse a l'ajout d'un produit
 */
export interface IAddProductResponseDto extends IResponseMessage {
  productId: number,

}

/**
 * Catégori de produit
 */
export interface IProductCategoryDto {
  code: string,
  categoryName: string
}

/**
 * Statut du produit
 */
export interface IProductStatusDto {
  code: string,
  statusName: string
}

/**
 * Données sur un produit en mode "résumé"
 */
export interface ISummarizeProductDto {
  id: string,
  title: string,
  productCategory: IProductCategoryDto,
  productStatus: IProductStatusDto,
  imageToShow: string
}

/**
 * Liste des produits d'un seller
 */
export interface IGetSellerProductsDto {
  sellerProducts: ISummarizeProductDto[],
  responseMessage: string
}

/**
 * Désactivation d'un produit
 */
export interface IDesactivateProductDto {
  productId: string,
  sellerId: string,
}

export interface IDesactivateProductResponseDto extends IResponseMessage {
  productId: string,
  sellerId: string,
  isProductActif: boolean
}

/**
 * Detail d'un produit
 */
export interface IGetProductDetailDto {
  sellerId: string,
  productId: string
}

export interface IGetProductDetailResponseDto {
  sellerId: string,
  productId: string,
  productPurchasePrice: number,
  productSoldPrice: number,
  productName: string,
  photoImagePath: string,
  productBuyAt: Date,
  productSoldAt: Date,
  productStatus: string,
  responseMessage: string
}

/**
 * Mise a jour d'un produit
 */
export interface IProductUpdateDto {
  sellerId: string,
  productId: string,
  productPurchasePrice: number,
  productSoldPrice: number,
  productBuyDay: string,
  productSoldDay: string | null,
  productStatus: string

}

export interface IProductUpdateResponseDto {
  productId: string ,
  productPurchasePrice: number,
  productSoldPrice: number,
  productBuyDay  : string,
  productSoldDay: string | null,
  responseMessage: string,
  productStatus: string
}

/**
 * Données pour filtrer la liste des produits
 */
export interface IProductFilterValueDto {
  sellerId: string,
  filterByName: string,
  filterByCategoryCode: string,
  filterByRegisterPeriod: number
  areSoldProductVisible: boolean
}

/**
 * Données pour filtrer la liste des produits par date maximum d'ajout
 */
export interface IFilterProductByMaxAgeDto {
  maxAgeLabel: string,
  maxAgeValue: number
}

/**
 * Données pour filtrer la liste des produits par catégory de produit
 */
export interface IFilterProductByCategoryDto {
  name: string,
  code: string
}
