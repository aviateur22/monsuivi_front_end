import { Component, inject, Inject } from '@angular/core';
import { SellerService } from '../../service/seller.service';
import { Router } from '@angular/router';
import pagesInformations from '../../../../../misc/pages-informations';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../store/state';
import { logoutAction } from '../../store/action';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  private _sellerDervice = inject(SellerService);
  private _router = inject(Router);
  private _store = inject(Store<IAppState>);

  /**
   * Deconnexion
   */
  logout() {
    this._sellerDervice.logout();
    this._store.dispatch(logoutAction());
    this._router.navigate([pagesInformations.home.url]);
  }
}
