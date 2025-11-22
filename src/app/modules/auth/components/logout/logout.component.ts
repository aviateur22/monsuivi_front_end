import { Component, inject, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../store/state';
import { logoutAction } from '../../store/action';
import { takeUntil } from 'rxjs';
import { ActifSeller } from '../../models/actif-seller';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent extends ActifSeller  {
  protected override _router = inject(Router);
  protected override  _store = inject(Store<IAppState>);

  /**
   * Deconnexion
   */
  logout() {
    this.isSellerAuthentified()
      .pipe(takeUntil(this._destroy$))
      .subscribe(sellerId => {
        if(!sellerId)
          return;

        this._store.dispatch(logoutAction({ sellerId }))
      }
    )
  }
}
