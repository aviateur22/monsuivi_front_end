import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../store/state';
import { selectImage } from '../../store/action';
import { IProductCategoryIhmDto } from '../../model/product.dto';
import { MobileDeviceService } from '../../../../mobile_device/service/mobile-device.service';

@Component({
  selector: 'app-creat-product',
  templateUrl: './creat-product.component.html',
  styleUrl: './creat-product.component.css'
})
export class CreatProductComponent {

  @Input() fg!: FormGroup;
  @Input() productCategories! :  IProductCategoryIhmDto[] | undefined
  seletcProductCategory: IProductCategoryIhmDto | undefined; // Produit sélectionné

  // Si support sur un téléphone iu tablette
  isOnMobile: boolean = false;

  constructor( private _store: Store<IAppState>, private _mobileDeviceService: MobileDeviceService) {}


  ngOnInit() {
    this.isOnMobile = this._mobileDeviceService.isOnMobileDevice();
  }
  /**
   *
   * @param file
   */
  selectImageEmit(file: File) {
    console.log("image" + file);
    if(file != null) {
      console.log(`[CreatProductComponent] ${file} `);
      this._store.dispatch(selectImage({ selectImage: file }));
    }
  }
}
