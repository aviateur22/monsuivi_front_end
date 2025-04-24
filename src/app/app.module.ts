import { APP_INITIALIZER, NgModule, isDevMode } from "@angular/core";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { provideHttpClient } from "@angular/common/http";
import { EffectsModule } from "@ngrx/effects";
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreModule } from "@ngrx/store";

import { reducers } from "./store/state";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from "../environment/environment";
import { ShareEffect } from "./modules/share/store/effect";
import { ProductEffect } from "./modules/product/store/effect";
import { AuthorizeModule } from "./modules/authorize/authorize.module";
import { ProductModule } from "./modules/product/product.module";
import { ShareModule } from "./modules/share/share.module";
import { UserService } from "./users/service/user.service";

export function initialize(userService: UserService) {
  return ()=>{
    userService.fakeUser();
  }
}

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
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: initialize,
      deps: [UserService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
