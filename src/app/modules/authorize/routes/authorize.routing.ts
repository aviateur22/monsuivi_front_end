import { Route } from "@angular/router";
import pagesInformations from "../../../../misc/pages-informations";
import { HomeComponent } from "../pages/home/home.component";


export const authorizeRouting: Route[] = [
  { path: pagesInformations.home.url, component: HomeComponent, title: pagesInformations.home.title, pathMatch: "full" }
]
