import { IAddProductAction, IDesactivateProductAction, IProductDetailAction, ISellerProducts } from "./model";

export interface IProductState {
  addProduct: IAddProductAction,
  selectImage: File | null,
  sellerProducts: ISellerProducts,
  desactivateProduct: IDesactivateProductAction,
  productDetail: IProductDetailAction
}
