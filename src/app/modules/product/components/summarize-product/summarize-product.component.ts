import { Component, Input } from '@angular/core';
import { SummarizeProduct } from '../../model/product.model';
import { environment } from '../../../../../environment/environment';
import apiUrl from '../../../../../misc/api.url';

@Component({
  selector: 'app-summarize-product',
  templateUrl: './summarize-product.component.html',
  styleUrl: './summarize-product.component.css'
})
export class SummarizeProductComponent {
  @Input() product!: SummarizeProduct;

  //Path de l'image du produit à charger
  imageUrl: string = '';

  ngOnChanges() {
    if (this.product) {
      this.imageUrl = apiUrl.streamImage.url.replace('{imagePath}', this.product.imagePath);

    }
  }
}
