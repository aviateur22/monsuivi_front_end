import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

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
  previewFileFileBase64: string ='';
  fileTitle:  string = '';

  /**
   * Chargement du document
   * @param
   */
  loadSelectedFile(file: File | undefined){
    this.isFileSelected = false;
    this.isFileOfImageType =  false;
    this.fileTitle = '';
    this.selectedFileEmitter.emit(file);

    if(file){
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

  loadPhoto(event:Event) {
    console.log(`[AddFileComponent] - loadPhoto`);
    this.isFileSelected = false;
    this.isFileOfImageType =  false;
    this.fileTitle = '';
    const input = event.target as HTMLInputElement;
    if (!input.files|| !input.files[0]) {
      console.log(`[AddFileComponent] - loadPhoto: pas de photo`);
      return;
    }
    const file = input.files[0];
    this.fileTitle = file.name;
    this.fileSelected = file;
    this.previewFileFileBase64 = URL.createObjectURL(file);
    this.isFileSelected = true
  }
}
