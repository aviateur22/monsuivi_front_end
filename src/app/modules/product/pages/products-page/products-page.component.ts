import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IAppState } from '../../../../store/state';
import { select, Store } from '@ngrx/store';

import { getSellerProductsAction } from '../../store/action';
import * as productSelector from '../../store/selector';
import { SummarizeProduct } from '../../model/product.model';
import { UserService } from '../../../../users/service/user.service';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [ // each time the binding value changes
        query(':enter', [
          style({ opacity: 0, transform: 'translateX(40px)' }),
          stagger(100, [
            animate('0.3s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class ProductsPageComponent {
    isLoading$: Observable<boolean>;
    sellerProducts$: Observable<SummarizeProduct[]>;
    user = this._userService.getUser();


    constructor(private _store: Store<IAppState>, private _userService: UserService) {
      this.isLoading$ = this._store.pipe(select(productSelector.selectIsGetSellerProductsLoading));
      this.sellerProducts$ =this._store.pipe(select(productSelector.selectGetSellerProducts));
    }

    ngOnInit() {
      // Réchargement utilisateur
      this._userService.loadUserFromStorage();

      // Dispatch récupération des données client
      if(this.user)
        this._store.dispatch(getSellerProductsAction({sellerId:this.user.userId}));

    }

}
