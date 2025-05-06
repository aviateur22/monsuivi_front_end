import { environment } from "../environment/environment";

export default {
  addProduct: {
    url: `${environment.api_base}/products`
  },
  getSellerProducts: {
    url:`${environment.api_base}/products/seller/{userId}`
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
  }

}
