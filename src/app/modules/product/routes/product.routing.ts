import { Route } from "@angular/router";
import pagesInformations from "../../../../misc/pages-informations";
import { AddProductPageComponent } from "../pages/add-product-page/add-product-page.component";
import { ProductsPageComponent } from "../pages/products-page/products-page.component";
import { DetailProductComponent } from "../components/detail-product/detail-product-page.component";


export const productRouting: Route[] = [
  { path: pagesInformations.addProduct.url, component: AddProductPageComponent, title: pagesInformations.addProduct.title },
  { path: pagesInformations.sellerProducts.url, component: ProductsPageComponent, title: pagesInformations.sellerProducts.title },
  { path: pagesInformations.detailProduct.url, component: DetailProductComponent, title: pagesInformations.detailProduct.title }

]
