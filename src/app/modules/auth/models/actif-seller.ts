import { select, Store } from "@ngrx/store";
import { firstValueFrom, map, Observable, of, Subject, take, takeUntil } from "rxjs";
import { Seller } from "./auth.model";
import { actifSellerSelector } from "../store/selector";
import { IAppState } from "../../../store/state";
import { displayMessageAction } from "../../share/store/action";
import { Router } from "@angular/router";
import pagesInformations from "../../../../misc/pages-informations";
import { Inject, Injectable, OnDestroy } from "@angular/core";

@Injectable({
  providedIn:"root"
})
export abstract class ActifSeller implements OnDestroy {
  protected _destroy$ = new Subject<void>();
  // Vendeur actif
  protected _seller$: Observable<Seller | null> = this._store.pipe(select(actifSellerSelector)).pipe(takeUntil(this._destroy$));

  constructor(protected _store: Store<IAppState>, protected _router: Router){}

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  /**
   * Vérification authentification du vendeur
   *
   * @returns L'identifiant du vendeur ou Null si session a expirée
   */
  protected isSellerAuthentified(): Observable<string | null> {

    return this._seller$
    .pipe(
      take(1),
      map(seller => {
        if(seller)
          return seller.userId

        this._store.dispatch(
          displayMessageAction({ message: { title: '', message: 'Votre session à expirée, connectez-vous', isOnError: true } })
        );

        this._router.navigate([pagesInformations.login.url]);
        return null;
    }))
  }
}
