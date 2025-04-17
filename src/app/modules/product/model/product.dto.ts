import { IResponseMessage } from "../../share/model/share.dto"

/**
 * Format de la categorie produit utilisé pour la selection dans IHM
 * @see AddProductPageComponent
 */
export interface ProductCategory {
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
