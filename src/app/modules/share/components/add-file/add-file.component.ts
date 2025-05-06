import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../../../store/state';
import * as selector from '../../../product/store/selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrl: './add-file.component.css'
})
export class AddFileComponent {

  @Input() inputFileFormControlName!: string;
  @Input() fg!:FormGroup

  // Document selectionné
  @Output() selectedFileEmitter = new EventEmitter<File>();

  fileSelected: File|undefined;
  isFileSelected: boolean = false;
  isFileOfImageType = false;
  previewFileFileBase64: string | null ='';
  fileTitle:  string = '';

  // Ajout d'un produit en success
  isAddProductSuccess$: Observable<boolean>;

  constructor(private _store: Store<IAppState>) {
    this.isAddProductSuccess$ = this._store.pipe(select(selector.selectIsAddProductSuccess));
  }

  ngOnInit() {
    this.isAddProductSuccess$.subscribe(isAddproductSuccess=> {

      if(isAddproductSuccess)
        this.clearPreview();
    })
  }

  /**
   * Chargement du document
   * @param
   */
  loadSelectedFile(file: File | undefined){
    this.isFileSelected = false;
    this.isFileOfImageType =  false;
    this.fileTitle = '';

    if(file){
      this.selectedFileEmitter.emit(file);
      this.fileSelected = file;
      this.fileTitle = file.name;

      if(file.type.startsWith('image/'))
        this.isFileOfImageType = true;

      const fileReader = new FileReader();
      // Lecture image
      fileReader.readAsDataURL(file);
      fileReader.onload = ()=> {
        this.previewFileFileBase64 = fileReader.result as string;
        this.isFileSelected = true;
      }
    }
  }

  /**
   * Suppression de l'image en preview
   */
  clearPreview() {
    console.log(`[AddFileComponent] - clearPreview`);
    this.previewFileFileBase64 = '';
    this.fileTitle = '';
    this.isFileSelected = false
  }
}
