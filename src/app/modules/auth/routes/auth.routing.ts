import { Route } from "@angular/router";
import pagesInformations from "../../../../misc/pages-informations";
import { LoginComponent } from "../components/login/login.component";
import { RegisterComponent } from "../components/register/register.component";
import { LogoutComponent } from "../components/logout/logout.component";
import { sellerRouteGuard } from "../../../guards/route.guard";


export const authRouting: Route[] = [
  { path: pagesInformations.login.url, component: LoginComponent, title: pagesInformations.login.title },
  { path: pagesInformations.register.url, component: RegisterComponent, title: pagesInformations.register.title },
  { path: pagesInformations.logout.url, component: LogoutComponent, title: pagesInformations.logout.title, canActivate: [sellerRouteGuard] }
]
