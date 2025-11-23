import { Component, HostListener, OnInit } from '@angular/core';
import pagesInformations from '../../../../../misc/pages-informations';
import { actifSellerSelector } from '../../../auth/store/selector';
import { IAppState } from '../../../../store/state';
import { select, Store } from '@ngrx/store';
import { Seller } from '../../../auth/models/auth.model';
import { Observable, of, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  private destroy$ = new Subject<void>();
  addProductLink: string = pagesInformations.addProduct.url;
  homeLink: string = pagesInformations.home.url;
  sellerProducts = pagesInformations.sellerProducts.url;
  graphicalStatisticLink =  pagesInformations.selectStatisticalGraphic.url;
  loginLink = pagesInformations.login.url;
  registerLink = pagesInformations.register.url;
  logoutLink = pagesInformations.logout.url;
  desactivateProductLink = pagesInformations.desactivateProducts.url;

  isMenuVisible:boolean = false;

  // Utilisateur
  seller$: Observable<Seller | null> = this._store.pipe(select(actifSellerSelector)).pipe(takeUntil(this.destroy$));

  public constructor(private _store: Store<IAppState>){}

  ngOnInit(): void {
  }


  /**
   * Toggle MenuOverlay
   */
  displayMenuOverlay() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  /**
   *
   * @param event
   */
    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
      this.checkWidth();
    }

    /**
     *
     */
    checkWidth() {
      if (window.innerWidth > 950 && this.isMenuVisible) {
        this.isMenuVisible = false;
      }
    }

}
