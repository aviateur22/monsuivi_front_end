import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

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

  loadPhoto(event:Event) {
    console.log(`[TakePhotoOnMobileComponent] - loadPhoto`);
    this.isFileSelected = false;
    this.fileTitle = '';
    const input = event.target as HTMLInputElement;
    if (!input.files|| !input.files[0]) {
      console.log(`[TakePhotoOnMobileComponent] - loadPhoto: pas de photo`);
      return;
    }
    const file = input.files[0];
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
