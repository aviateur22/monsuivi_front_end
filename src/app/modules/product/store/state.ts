import { IAddProductDto } from "../model/product.dto";
import { IAddProductAction } from "./model";

export interface IProductState {
  addProduct: IAddProductAction,
  selectImage: File | null
}
