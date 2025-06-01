import { Component } from '@angular/core';
import { Router } from '@angular/router';
import pagesInformations from '../../../../../misc/pages-informations';

@Component({
  selector: 'app-select-static-graphic-page',
  templateUrl: './select-static-graphic-page.component.html',
  styleUrl: './select-static-graphic-page.component.css'
})
export class SelectStaticGraphicPageComponent {

  constructor(private _router: Router) {}

  /**
   * Affichage graphiuqe mois actual
   */
  displayActualMonthGraphic(): void {
    this._router.navigate([pagesInformations.actualMonthGraphic.url]);
  }

  /**
   * Affichage graphiuqe année actual
   */
  displayActualYearGraphic(): void {
    this._router.navigate([pagesInformations.actualYearGraphic.url]);
  }

}
