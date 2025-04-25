import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MobileDeviceService {

  constructor() { }

  /**
   * Renvoie si un utilisateur est sur un téléphone
   */
  isOnMobileDevice(): boolean {
    const userAgent = navigator.userAgent || navigator.vendor;
    return /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  }
}
