import { IDesactivateProductDto } from "../model/product.dto"
import { DesactivateProduct, SummarizeProduct } from "../model/product.model"

export interface IAddProductAction {
  addProduct: FormData | null,
  isLoading: boolean,
  isSuccess: boolean
}

export interface ISellerProducts {
  summarizeProducts: SummarizeProduct[],
  isLoading: boolean,
  isSuccess: boolean
}

export interface IDesactivateProductAction {
  desactivateProduct: DesactivateProduct | null,
  isLoading: boolean,
  isSuccess: boolean
}
