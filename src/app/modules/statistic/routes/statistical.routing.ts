import { Route } from "@angular/router";
import pagesInformations from "../../../../misc/pages-informations";
import { SelectStaticGraphicPageComponent } from "../page/select-static-graphic-page/select-static-graphic-page.component";
import { StatisticalGraphicPageComponent } from "../page/statistical-graphic-page/statistical-graphic-page.component";

export const statisticalRouting: Route[] = [
  { path: pagesInformations.selectStatisticalGraphic.url, component: SelectStaticGraphicPageComponent, title: pagesInformations.selectStatisticalGraphic.title },
  { path: pagesInformations.soldAndBuyProductPriceByCategoryForOneMonth.url, component: StatisticalGraphicPageComponent, title: pagesInformations.soldAndBuyProductPriceByCategoryForOneMonth.title},
  { path: pagesInformations.soldAndBuyProductQuantityByCategoryForOneMonth.url, component: StatisticalGraphicPageComponent, title: pagesInformations.soldAndBuyProductQuantityByCategoryForOneYear.title},
  { path: pagesInformations.soldAndBuyProductQuantityByCategoryForOneYear.url, component: StatisticalGraphicPageComponent, title: pagesInformations.soldAndBuyProductQuantityByCategoryForOneYear.title},
  { path: pagesInformations.soldAndBuyProductPriceByCategoryForOneYear.url, component: StatisticalGraphicPageComponent, title: pagesInformations.soldAndBuyProductPriceByCategoryForOneYear.title},
  { path: pagesInformations.soldAndBuyProductPriceForOneYear.url, component: StatisticalGraphicPageComponent, title: pagesInformations.soldAndBuyProductPriceForOneYear.title},
  { path: pagesInformations.soldAndBuyProductQuantityForOneYear.url, component: StatisticalGraphicPageComponent, title: pagesInformations.soldAndBuyProductQuantityForOneYear.title}

]
