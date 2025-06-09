import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, fromEvent, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsFilterVisibilityService {

  // Visibilité du filtre
  private isFilterProductsVisibleSubject = new BehaviorSubject<boolean>(true);
  isFilterProductsVisible$ = this.isFilterProductsVisibleSubject.asObservable();

  // Visibilité button affichage filtre
  private isButtonFilterVisibleSubject = new BehaviorSubject<boolean>(false);
  isButtonFilterVisible$ = this.isButtonFilterVisibleSubject.asObservable();

  // Visibilité du button fermer du filtre
  private isClosedButtonFilterVisibleSubject = new BehaviorSubject<boolean>(false);
  isClosedButtonFilterVisible$ = this.isButtonFilterVisibleSubject.asObservable();

  constructor() {

    // Gestion du resize
    fromEvent(window, 'resize')
    .pipe(
      debounceTime(200),
      startWith(null)
    )
    .subscribe(()=>this.checkWidth())
  }

  /**
   * Affichage du filtre des produits en cliquant sur le bouton affichage
   * Bouton dispo uniquement sur petit ecran
   */
  displayProductsFilter(): void {
    this.isFilterProductsVisibleSubject.next(true);
  }

  /**
   * Masque le filtre des produits en cliquant sur le bouton closed
   * Bouton dispo uniquement sur petit ecran
   */
  hideProductsFilter(): void {
    this.isFilterProductsVisibleSubject.next(false);
  }

  /**
   * Gestion visibilité Filtre fonction de la largeur de l'écran
   */
  private checkWidth(): void {
    if (window.innerWidth > 768) {
      this.isClosedButtonFilterVisibleSubject.next(false);
      this.isButtonFilterVisibleSubject.next(false);
      this.isFilterProductsVisibleSubject.next(true);
    } else {
      this.isClosedButtonFilterVisibleSubject.next(true);
      this.isButtonFilterVisibleSubject.next(true);
      this.isFilterProductsVisibleSubject.next(false)
    }
  }


}
