import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  /**
   * Compression d'une image
   * @param file - fichier a compresser
   * @param maxSize
   * @param quality
   * @returns Promise<File>
   */
  async compressImage(file: File, maxSize: number, quality: number): Promise<File> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (e: any) => {
        const img = new Image();
        img.src = e.target.result;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Maintain aspect ratio
          if (width > height) {
            if (width > maxSize) {
              height = Math.round((height *= maxSize / width));
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width = Math.round((width *= maxSize / height));
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject('Canvas context erreur');
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob((blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, { type: 'image/jpeg' });
              resolve(compressedFile);
            } else {
              reject('La compression à echoué');
            }
          }, 'image/jpeg', quality);
        };

        img.onerror = (err) => {
          reject('Echec chargement image: ' + err);
        };
      };

      reader.onerror = (err) => {
        reject('Echec lecture image: ' + err);
      };
    });
  }
}
