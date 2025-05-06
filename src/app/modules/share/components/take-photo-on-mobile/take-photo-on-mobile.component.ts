import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ImageService } from '../../service/image.service';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../../../store/state';
import { Observable } from 'rxjs';
import * as selector from '../../../product/store/selector';

@Component({
  selector: 'app-take-photo-on-mobile',
  templateUrl: './take-photo-on-mobile.component.html',
  styleUrl: './take-photo-on-mobile.component.css'
})
export class TakePhotoOnMobileComponent {
  @Input() inputFileFormControlName!: string;
  @Input() fg!:FormGroup

  // Document selectionné
  @Output() selectedFileEmitter = new EventEmitter<File>();

  fileSelected: File|undefined;
  isFileSelected: boolean = false;
  previewFileFileBase64: string | ArrayBuffer | null ='';
  fileTitle:  string = '';

  // Si sur un téléphone
  isOnMobile: boolean = false;

    // Ajout d'un produit en success
    isAddProductSuccess$: Observable<boolean>;

  constructor(private _imageService: ImageService, private _store: Store<IAppState>){
    this.isAddProductSuccess$ = this._store.pipe(select(selector.selectIsAddProductSuccess));
  }

  ngOnInit() {
    this.isAddProductSuccess$.subscribe(isAddproductSuccess=> {

      if(isAddproductSuccess)
        this.clearPreview();
    })
  }

  async loadPhoto(event:Event) {
    console.log(`[TakePhotoOnMobileComponent] - loadPhoto`);
    this.isFileSelected = false;
    this.fileTitle = '';
    const input = event.target as HTMLInputElement;
    if (!input.files|| !input.files[0]) {
      console.log(`[TakePhotoOnMobileComponent] - loadPhoto: pas de photo`);
      return;
    }

    // Compression de la photo
    const file = await this._imageService.compressImage(input.files[0], 1024, 0.7);

    this.selectedFileEmitter.emit(file);

    this.fileTitle = file.name;
    this.fileSelected = file;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = ()=> {
      this.previewFileFileBase64 = fileReader.result as string;
    }
      this.isFileSelected = true
  }

  /**
   * Suppression de l'image en preview
   */
    clearPreview() {
      console.log(`[TakePhotoOnMobileComponent] - clearPreview`);
      this.previewFileFileBase64 = null;
      this.fileTitle = '';
      this.isFileSelected = false
    }
}
