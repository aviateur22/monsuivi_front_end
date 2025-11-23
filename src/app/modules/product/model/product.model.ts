export class AddProduct {
  constructor(
    public readonly productName: string,
    public readonly productPurchasePrice: number,
    public readonly productDesiredSoldPrice: number,
    public readonly productCategory: string
  ) {}
}

/**
 * Produit en mode résumé pour affichage sur IHM
 */
export class SummarizeProduct {
  constructor(
    public readonly productId: string,
    public readonly productName: string,
    public readonly productStatuscode: string,
    public readonly productCatgegoryLabel: string,
    public readonly imagePath: string,
    public readonly productBuyDay: string | null,
    public readonly productSoldDay: string | null,
  ){}
}

/**
 * Récupération des produits d'un vendeurs
 */
export class GetSellerProducts {
  constructor(
    public readonly responseMessage: string,
    public readonly products: SummarizeProduct[],
    public readonly productQuantity: number
  ){}
}

/**
 * Produit Désactivé
 */
export class UpdateProductActivation {
  constructor(
    public readonly sellerId: string,
    public readonly productId: string,
    public readonly isProductActif: boolean,
  ){}
}

export class ProductDetail {
  constructor(
    public readonly productId: string,
    public readonly productName: string,
    public readonly productCatgegoryLabel: string,
    public readonly productSoldPrice: number,
    public readonly productBuyPrice: number,
    public readonly productImagePath: string,
    public readonly productBuyDay: Date,
    public readonly productSoldDay: Date,
    public readonly productStatus: string
  ){}
}

/**
 * Status d'un produit
 */
export enum ProductStatus {
  FOR_SALE = 'fs', // A vendre
  SOLD = 'so' // vendu
}
