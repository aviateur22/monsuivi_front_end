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
    public readonly imagePath: string
  ){}
}

/**
 *
 */
export class GetSellerProducts {
  constructor(
    public readonly responseMessage: string,
    public readonly products: SummarizeProduct[]){}
}
