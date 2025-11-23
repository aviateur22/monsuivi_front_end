import { Injectable, signal } from '@angular/core';
import { Seller } from '../models/auth.model';
import { APP_CONSTANTS } from '../../../../misc/constant';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  private jwt = signal<string | null>(null);

  /**
   * Persistance des données utilisateur
   *
   * @param actifSeller Le vendeur authentifié
   * @param jwt Le token d'authentification
   */
  saveActifSeller(actifSeller: Seller, jwt: string) {
    this.setUser(actifSeller);
    this.setJwt(jwt);
  }

  /**
   * Déconnexion
   */
  logout() {
    localStorage.clear();
  }

  private setUser(seller: Seller) {
    localStorage.setItem(APP_CONSTANTS.ACTIF_SELLER, JSON.stringify(seller));
  }

  private setJwt(jwt: string) {
    localStorage.setItem(APP_CONSTANTS.HEADER_AUTHORIZATION_BEARER, JSON.stringify(jwt));
    this.jwt.set(jwt);
  }


}
