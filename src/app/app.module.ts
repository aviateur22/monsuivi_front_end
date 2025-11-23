import { NgModule, isDevMode } from "@angular/core";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { EffectsModule } from "@ngrx/effects";
import { ServiceWorkerModule } from '@angular/service-worker';
import { httpInterceptor } from "./interceptor/http.interceptor";
import { StoreModule } from "@ngrx/store";
import Lara from '@primeng/themes/lara';

import { reducers } from "./store/state";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from "../environment/environment";
import { ShareEffect } from "./modules/share/store/effect";
import { ProductEffect } from "./modules/product/store/effect";
import { AuthorizeModule } from "./modules/authorize/authorize.module";
import { ProductModule } from "./modules/product/product.module";
import { ShareModule } from "./modules/share/share.module";
import { AuthModule } from "./modules/auth/auth.module";

import { ToastModule } from 'primeng/toast';
import { StatisticModule } from "./modules/statistic/statistic.module";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { providePrimeNG } from "primeng/config";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ProductModule,
    ShareModule,
    AuthorizeModule,
    AppRoutingModule,
    StatisticModule,
    AuthModule,
    ToastModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      ProductEffect,
      ShareEffect
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, logOnly:! environment.production,
      serialize: {replacer: (_key, value) => (typeof value === "bigint" ? value.toString() : value)}
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    provideHttpClient(withInterceptors([httpInterceptor])),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Lara,
        options:{
          darkModeSelector: false
        }

      },

    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
