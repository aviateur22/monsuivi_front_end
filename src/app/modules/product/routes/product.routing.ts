import { Route } from "@angular/router";
import pagesInformations from "../../../../misc/pages-informations";
import { AddProductPageComponent } from "../pages/add-product-page/add-product-page.component";
import { ProductsPageComponent } from "../pages/products-page/products-page.component";
import { DetailProductComponent } from "../components/detail-product/detail-product-page.component";
import { sellerRouteGuard } from "../../../guards/route.guard";
import { DesactivateProductPageComponent } from "../pages/desactivate-product-page/desactivate-product-page.component";


export const productRouting: Route[] = [
  { path: pagesInformations.addProduct.url, component: AddProductPageComponent, title: pagesInformations.addProduct.title, canActivate: [sellerRouteGuard]},
  { path: pagesInformations.sellerProducts.url, component: ProductsPageComponent, title: pagesInformations.sellerProducts.title, canActivate: [sellerRouteGuard] },
  { path: pagesInformations.detailProduct.url, component: DetailProductComponent, title: pagesInformations.detailProduct.title, canActivate: [sellerRouteGuard] },
  { path: pagesInformations.desactivateProducts.url, component: DesactivateProductPageComponent, title: pagesInformations.desactivateProducts.title, canActivate: [sellerRouteGuard] }

]
