import { IResponseMessage } from "../../share/model/share.dto"

/**
 * Format de la categorie produit utilisé pour la selection dans IHM
 * @see AddProductPageComponent
 */
export interface IProductCategoryIhmDto {
  name: string,
  code: string
}

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

export interface IDesactivateProductDto {
  productId: string,
  sellerId: string,
}

export interface IDesactivateProductResponseDto extends IResponseMessage {
  productId: string,
  sellerId: string,
  isProductActif: boolean
}



