import { SummarizeProduct } from "../model/product.model"

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
