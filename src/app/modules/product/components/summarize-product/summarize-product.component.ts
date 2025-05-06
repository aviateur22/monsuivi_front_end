import { Component, Input } from '@angular/core';
import { SummarizeProduct } from '../../model/product.model';
import apiUrl from '../../../../../misc/api.url';
import { IAppState } from '../../../../store/state';
import { Store } from '@ngrx/store';
import { desactivateProduct } from '../../store/action';
import { UserService } from '../../../../users/service/user.service';
import { IGetProductDetailDto } from '../../model/product.dto';
import { getProductDetailAction } from '../../store/action';

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

  constructor(private _store: Store<IAppState>,  private _userService: UserService){}

  ngOnChanges() {
    if (this.product) {
      this.imageUrl = apiUrl.streamImage.url.replace('{imagePath}', this.product.imagePath);
    }
  }

  ngOnInit() {
    // Réchargement utilisateur
    this._userService.loadUserFromStorage();
  }


  /**
   * Désactivation du produit
   */
  desactivateProduct(event:MouseEvent) {
    event.stopPropagation();
    console.log("[SummarizeProductComponent]" + "[desactivateProduct]");
    if(this.user)
      this._store.dispatch(desactivateProduct({productToDesactivate: {
        sellerId: this.user.userId,
        productId: this.product.productId}
      }));
  }

  /**
   * Affichage detail d'un produit
   */
  showProductDetail() {
    console.log("[SummarizeProductComponent]" + "[showProductDetail]");

    if(!this.user)
      throw new Error("");

    const detailProductDto: IGetProductDetailDto = {
      sellerId: this.user.userId,
      productId: this.product.productId
    }

    console.log(`[SummarizeProductComponent] [showProductDetail] - idseller ${this.user.userId} - idproduct ${ this.product.productId}`);
    this._store.dispatch(getProductDetailAction({getProductDetail: detailProductDto}))
  }
}
