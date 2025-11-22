import { Route } from "@angular/router";
import pagesInformations from "../../../../misc/pages-informations";
import { SelectStaticGraphicPageComponent } from "../page/select-static-graphic-page/select-static-graphic-page.component";
import { ActualMonthGraphicPageComponent } from "../page/actual-month-graphic-page/actual-month-graphic-page.component";
import { ActualYearGraphicPageComponent } from "../page/actual-year-graphic-page/actual-year-graphic-page.component";
import { sellerRouteGuard } from "../../../guards/route.guard";

export const statisticalRouting: Route[] = [
  { path: pagesInformations.selectStatisticalGraphic.url, component: SelectStaticGraphicPageComponent, title: pagesInformations.selectStatisticalGraphic.title,  canActivate: [sellerRouteGuard] },
  { path: pagesInformations.actualMonthGraphic.url, component: ActualMonthGraphicPageComponent, title: pagesInformations.actualMonthGraphic.title,  canActivate: [sellerRouteGuard]},
  { path: pagesInformations.actualYearGraphic.url, component: ActualYearGraphicPageComponent, title: pagesInformations.actualYearGraphic.title,  canActivate: [sellerRouteGuard]}
]
