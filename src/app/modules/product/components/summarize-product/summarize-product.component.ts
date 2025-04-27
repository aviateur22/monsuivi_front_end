import { Component, Input } from '@angular/core';
import { SummarizeProduct } from '../../model/product.model';
import apiUrl from '../../../../../misc/api.url';
import { IAppState } from '../../../../store/state';
import { Store } from '@ngrx/store';
import { desactivateProduct } from '../../store/action';
import { UserService } from '../../../../users/service/user.service';

@Component({
  selector: 'app-summarize-product',
  templateUrl: './summarize-product.component.html',
  styleUrl: './summarize-product.component.css'
})
export class SummarizeProductComponent {
  @Input() product!: SummarizeProduct;

  //Path de l'image du produit à charger
  imageUrl: string = '';

  user = this._userService.getUser();

  ngOnChanges() {
    if (this.product) {
      this.imageUrl = apiUrl.streamImage.url.replace('{imagePath}', this.product.imagePath);
    }
  }

  ngOnInit() {
    // Réchargement utilisateur
    this._userService.loadUserFromStorage();
  }

  constructor(private _store: Store<IAppState>,  private _userService: UserService){}

  /**
   * Désactivation du produit
   */
  desactivateProduct() {
    console.log("[SummarizeProductComponent]" + "[desactivateProduct]")
    if(this.user)
      this._store.dispatch(desactivateProduct({productToDesactivate: {
        sellerId: this.user.userId,
        productId: this.product.productId}
      }));
    }
}
