import { environment } from "../environment/environment";

export default {
  addProduct: {
    url: `${environment.api_base}/products`
  },
  getSellerProducts: {
    url:`${environment.api_base}/products/seller/{sellerId}`
  },
  streamImage: {
    url: `${environment.api_base}/products/image/{imagePath}`
  },
  desactivateProduct: {
    url: `${environment.api_base}/products/desactivate`
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
