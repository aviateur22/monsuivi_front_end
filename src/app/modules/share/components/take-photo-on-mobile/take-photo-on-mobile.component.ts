import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ImageService } from '../../service/image.service';

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

  constructor(private _imageService: ImageService){}

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
}
