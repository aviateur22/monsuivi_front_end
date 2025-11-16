import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as authAction  from "./action";
import * as shareAction from "./../../share/store/action";
import { catchError,  from,  mergeMap, of, pipe, switchMap, tap } from "rxjs";
import { AuthService } from "../service/auth.service";
import { SellerService } from "../service/seller.service";
import { Router } from "@angular/router";
import pagesInformations from "../../../../misc/pages-informations";

@Injectable()
export class AuthEffect {

  constructor(
    private _action$: Actions,
    private _authService: AuthService,
    private _sellerService: SellerService,
    private _router: Router
  ){}

  login$ = createEffect(()=>
    this._action$.pipe(
      ofType(authAction.loginAction),
      mergeMap(({login: { email, password }})=>
        this._authService.login({ email, password }).pipe(
          mergeMap(result=> from([
            authAction.loginActionComplete({ dto : result }),
            authAction.persistActifSeller({
            actifSeller: {
                userId: result.id,
                roles: result.roles
              },
              jwt: result.jwt
            }),
            shareAction.displayMessageAction({message:{isOnError: false, title: '' , message: result.responseMessage}})
          ])
          .pipe(
            tap(() => this._router.navigate([pagesInformations.sellerProducts.url]))
          )
        ),
        catchError(error=> of(
          authAction.loginActionFailed(),
          shareAction.displayMessageAction({
          message: {title: '', message: error.error.error, isOnError: true}
        })))
        )
      )
    )
  );
  persistSeller$ = createEffect(()=>
    this._action$.pipe(
      ofType(authAction.persistActifSeller),
      tap(({ actifSeller, jwt }) => {
        this._sellerService.saveActifSeller(actifSeller, jwt);
      })
    ),
    { dispatch: false }
  );
}
