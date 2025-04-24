import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../store/state';
import { selectImage } from '../../store/action';
import { IProductCategoryIhmDto } from '../../model/product.dto';

@Component({
  selector: 'app-creat-product',
  templateUrl: './creat-product.component.html',
  styleUrl: './creat-product.component.css'
})
export class CreatProductComponent {

  @Input() fg!: FormGroup;
  @Input() productCategories! :  IProductCategoryIhmDto[] | undefined
  seletcProductCategory: IProductCategoryIhmDto | undefined; // Produit sélectionné

  constructor( private _store: Store<IAppState>) {}


  /**
   *
   * @param file
   */
  selectImageEmit(file: File) {
    if(file != null) {
      console.log(`[CreatProductComponent] ${file} `);
      this._store.dispatch(selectImage({ selectImage: file }));
    }
  }
}
