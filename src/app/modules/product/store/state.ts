import { IAddProductDto } from "../model/product.dto";
import { IAddProductAction, ISellerProducts } from "./model";

export interface IProductState {
  addProduct: IAddProductAction,
  selectImage: File | null,
  sellerProducts: ISellerProducts
}
