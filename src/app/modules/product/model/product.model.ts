export class AddProduct {
  constructor(
    public readonly productName: string,
    public readonly productPurchasePrice: number,
    public readonly productDesiredSoldPrice: number,
    public readonly productCategory: string
  ) {}


}
