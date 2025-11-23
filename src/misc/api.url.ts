import { environment } from "../environment/environment";

export default {
  addProduct: {
    url: `${environment.api_base}/products`
  },
  login:{
    url: `${environment.api_base}/auth/login`
  },
  logout: {
    url: `${environment.api_base}/auth/logout/{sellerId}`
  },
  register: {
    url: `${environment.api_base}/auth/register`
  },
  getSellerProducts: {
    url:`${environment.api_base}/products/seller/{sellerId}/all-products`
  },
  getDesactivateSellerProducts: {
    url:`${environment.api_base}/products/seller/{sellerId}/desactivate-products`
  },
  filterSellerProducts: {
    url:`${environment.api_base}/products/seller/{sellerId}/filter`
  },
  streamImage: {
    url: `${environment.api_base}/products/image/{imagePath}`
  },
  desactivateProduct: {
    url: `${environment.api_base}/products/desactivate`
  },
  activateProduct: {
    url: `${environment.api_base}/products/activate`
  },
  getProductDetail: {
    url: `${environment.api_base}/products/{productId}/seller-id/{sellerId}`
  },
  productUpdate: {
    url: `${environment.api_base}/products`
  },
  getSoldAndBuyProductQuantityByCategoryAndMonth: {
    url: `${environment.api_base}/charts/product-quantity-by-category-and-month/seller/{sellerId}/month/{month}/year/{year}`
  },
  getSoldAndBuyProductPriceByCategoryAndMonth: {
    url: `${environment.api_base}/charts/product-price-by-category-and-month/seller/{sellerId}/month/{month}/year/{year}`
  },
  getSoldAndBuyProductPriceByCategoryAndYear: {
    url: `${environment.api_base}/charts/product-price-by-category-and-year/seller/{sellerId}/year/{year}`
  },
  getSoldAndBuyProductQuantityByCategoryAndYear: {
    url: `${environment.api_base}/charts/product-quantity-by-category-and-year/seller/{sellerId}/year/{year}`
  },
  getSoldAndBuyProductQuantityByYear: {
    url: `${environment.api_base}/charts/product-quantity-by-year/seller/{sellerId}/year/{year}`
  },
  getSoldAndBuyProductPriceByYear: {
    url: `${environment.api_base}/charts/product-price-by-year/seller/{sellerId}/year/{year}`
  },
  getSoldAndBuyProductQuantityByMonth: {
    url: `${environment.api_base}/charts/product-quantity-by-month/seller/{sellerId}/month/{month}/year/{year}`
  },
  getSoldAndBuyProductPriceByMonth: {
    url: `${environment.api_base}/charts/product-price-by-month/seller/{sellerId}/month/{month}/year/{year}`
  }

}
