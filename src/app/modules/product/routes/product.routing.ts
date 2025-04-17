import { Route } from "@angular/router";
import pagesInformations from "../../../../misc/pages-informations";
import { AddProductPageComponent } from "../pages/add-product-page/add-product-page.component";


export const productRouting: Route[] = [
  { path: pagesInformations.addProduct.url, component: AddProductPageComponent, title: pagesInformations.addProduct.title }
]
