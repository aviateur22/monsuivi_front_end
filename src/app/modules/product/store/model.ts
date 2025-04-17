import { IAddProductDto } from "../model/product.dto"

export interface IAddProductAction {
  addProduct: FormData | null,
  isLoading: boolean,
  isSuccess: boolean
}
