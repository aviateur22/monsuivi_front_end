import { environment } from "../environment/environment";

export default {
  addProduct: {
    url: `${environment.api_base}/products`
  },
  getSellerProducts: {
    url:`${environment.api_base}/products/seller/{userId}`
  }
}
