import { Component, HostListener } from '@angular/core';
import pagesInformations from '../../../../../misc/pages-informations';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  addProductLink: string = pagesInformations.addProduct.url;
  homeLink: string = pagesInformations.home.url;
  sellerProducts = pagesInformations.sellerProducts.url;
  graphicalStatistic =  pagesInformations.selectStatisticalGraphic.url;

  isMenuVisible:boolean = false;


  /**
   * Toggle MenuOverlay
   */
  displayMenuOverlay() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  /**
   *
   * @param event
   */
    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
      this.checkWidth();
    }

    /**
     *
     */
    checkWidth() {
      if (window.innerWidth > 768 && this.isMenuVisible) {
        this.isMenuVisible = false;
      }
    }

}
