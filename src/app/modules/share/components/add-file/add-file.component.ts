import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MobileDeviceService } from '../../../../mobile_device/service/mobile-device.service';

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
  previewFileFileBase64: string | ArrayBuffer | null ='';
  fileTitle:  string = '';

  // Si sur un téléphone
  isOnMobile: boolean = false;

  constructor(private _mobileDeviceService: MobileDeviceService){}
  ngOnInit() {
    console.log(this.isOnMobile)
    this.isOnMobile = this._mobileDeviceService.isOnMobileDevice();
    console.log(this.isOnMobile)
  }

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
    const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewFileFileBase64 = e.target.result;
      };
      reader.readAsDataURL(file);
      this.isFileSelected = true
  }
}
