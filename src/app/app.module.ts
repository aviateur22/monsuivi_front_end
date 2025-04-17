import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { provideHttpClient } from "@angular/common/http";

import { reducers } from "./store/state";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from "../environment/environment";
import { StoreModule } from "@ngrx/store";
import { ShareEffect } from "./modules/share/store/effect";
import { ProductEffect } from "./modules/product/store/effect";

import { ProductModule } from "./modules/product/product.module";
import { ShareModule } from "./modules/share/share.module";
import { EffectsModule } from "@ngrx/effects";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ProductModule,
    ShareModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      ProductEffect,
      ShareEffect
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, logOnly:! environment.production,
      serialize: {replacer: (_key, value) => (typeof value === "bigint" ? value.toString() : value)}
    })
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
