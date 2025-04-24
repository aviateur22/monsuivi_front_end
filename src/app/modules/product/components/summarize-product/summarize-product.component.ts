import { Component, Input } from '@angular/core';
import { SummarizeProduct } from '../../model/product.model';

@Component({
  selector: 'app-summarize-product',
  templateUrl: './summarize-product.component.html',
  styleUrl: './summarize-product.component.css'
})
export class SummarizeProductComponent {
  @Input() product!: SummarizeProduct;

}
