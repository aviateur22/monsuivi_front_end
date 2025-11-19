import { Component, Input } from '@angular/core';
import { SummarizeProduct } from '../../model/product.model';
import apiUrl from '../../../../../misc/api.url';
import { IAppState } from '../../../../store/state';
import { Store } from '@ngrx/store';
import { desactivateProduct } from '../../store/action';
import { Router } from '@angular/router';
import pagesInformations from '../../../../../misc/pages-informations';
import { ActifSeller } from '../../../auth/models/actif-seller';
import { take } from 'rxjs';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-summarize-product',
  templateUrl: './summarize-product.component.html',
  styleUrl: './summarize-product.component.css'
})
export class SummarizeProductComponent extends ActifSeller {
  @Input() product!: SummarizeProduct;

  //Path de l'image du produit à charger
  imageUrl: string = '';

  constructor(
    private _productService: ProductService,
    protected override _router: Router,
    protected override _store: Store<IAppState>){
      super(_store, _router);
    }

  ngOnChanges() {
    if (this.product) {
      this._productService.streamProductImage(this.product.imagePath)
      .subscribe(blob => {
        this.imageUrl = URL.createObjectURL(blob);
      });
    }
  }

  /**
   * Désactivation du produit
   */
  desactivateProduct(event:MouseEvent) {
    event.stopPropagation();
    console.log("[SummarizeProductComponent]" + "[desactivateProduct]");

    this.isSellerAuthentified()
    .pipe(take(1))
    .subscribe(sellerId => {
      if(!sellerId)
        return;
      this._store.dispatch(desactivateProduct({productToDesactivate: {
        sellerId,
        productId: this.product.productId}
      }));
    })
  }

  /**
   * Affichage detail d'un produit
   */
  showProductDetail() {
    this._router.navigate([pagesInformations.detailProduct.url.replace(":product-id", this.product.productId)]);
  }
}
