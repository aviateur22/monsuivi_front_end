import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, fromEvent, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsFilterVisibilityService {

  // Visibilité du composant filtre
  private isFilterProductsVisibleSubject = new BehaviorSubject<boolean>(true);
  isFilterProductsVisible$ = this.isFilterProductsVisibleSubject.asObservable();

  // Visibilité button affichage filtre sur ecran mobile
  private isButtonFilterVisibleSubject = new BehaviorSubject<boolean>(false);
  isButtonFilterVisible$ = this.isButtonFilterVisibleSubject.asObservable();

  // Visibilité du button fermer du filtre qui est présent sur le composant Filtre
  private isClosedButtonFilterVisibleSubject = new BehaviorSubject<boolean>(false);
  isClosedButtonFilterVisible$ = this.isClosedButtonFilterVisibleSubject.asObservable();

  /**
   * Sur un mobile, l'apparaition d'un clavié vient perturber la taille de l'écran
   * temporairement.
   * Cela a pour conséquence de fermer le filtre lors du focus dune textbox qui se trouve dans
   * le filtre.
   * Pour remedier a ce probleme, un boolean isInputFocused est utilisé pour inhibé l'appel
   * à la méthode checkVisibilityFilterByWidth()
   */
  isInputFocused: boolean = false;

  constructor() {

    // Gestion du resize
    fromEvent(window, 'resize')
    .pipe(
      debounceTime(200),
      startWith(null)
    )
    .subscribe(()=>{
      if(!this.isInputFocused)
        this.checkVisibilityFilterByWidth();
    })
  }

  /**
   * Affichage du filtre des produits en cliquant sur le bouton affichage
   * Bouton dispo uniquement sur petit ecran
   */
  displayProductsFilter(): void {
    this.isFilterProductsVisibleSubject.next(true);
    this.isButtonFilterVisibleSubject.next(false);
  }

  /**
   * Masque le filtre des produits en cliquant sur le bouton closed
   * Bouton dispo uniquement sur petit ecran
   */
  hideProductsFilter(): void {
    this.isFilterProductsVisibleSubject.next(false);
    this.isButtonFilterVisibleSubject.next(true);
  }

  /**
   * Gestion visibilité Filtre fonction de la largeur de l'écran
   */
  private checkVisibilityFilterByWidth(): void {
    if(this.hasFilterBarTobeDisplayed()) {
      // Affichage de la bare de filtrage
      this.isClosedButtonFilterVisibleSubject.next(false);
      this.isButtonFilterVisibleSubject.next(false);
      this.isFilterProductsVisibleSubject.next(true);
      return;
    }
      this.isClosedButtonFilterVisibleSubject.next(true);
      this.isButtonFilterVisibleSubject.next(true);
      this.isFilterProductsVisibleSubject.next(false)

  }

  /**
   * Détermine si la bar de filtrage doit être cachée
   */
  hasFilterBarTobeDisplayed() {
    return (window.innerWidth > 768)
  }
}
