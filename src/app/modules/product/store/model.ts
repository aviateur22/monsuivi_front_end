import { UpdateProductActivation, ProductDetail, SummarizeProduct } from "../model/product.model"

export interface IAddProductAction {
  addProduct: FormData | null,
  isLoading: boolean,
  isSuccess: boolean
}

export interface ISellerProducts {
  summarizeProducts: SummarizeProduct[],
  productQuantity: number,
  areProductInActivateMode: boolean,
  isLoading: boolean,
  isSuccess: boolean
}

export interface IUpdateProductActivation {
  updateProductActivation: UpdateProductActivation | null,
  isLoading: boolean,
  isSuccess: boolean
}

export interface IProductDetailAction {
  isLoading: boolean,
  isPopupShow: boolean,
  productDetail: ProductDetail | null
}

/**
 * Données renseignées dans le filtre
 */
export interface IFilterProduct {
  productName: string,
  productCategory: boolean,
  productMaxAge: ProductDetail | null
}


