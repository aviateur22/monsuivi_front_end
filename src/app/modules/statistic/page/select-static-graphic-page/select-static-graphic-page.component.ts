import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import pagesInformations from '../../../../../misc/pages-informations';
import { StatisticalDateService } from '../../services/statistical.date.service';

@Component({
  selector: 'app-select-static-graphic-page',
  templateUrl: './select-static-graphic-page.component.html',
  styleUrl: './select-static-graphic-page.component.css'
})
export class SelectStaticGraphicPageComponent implements OnInit {
  year: number = 0;

  actualMonth: string = '';

  constructor(private _router: Router, private _dateService: StatisticalDateService) {}

  ngOnInit(): void {

    this.year = this._dateService.getActualYear();
    this.actualMonth = this._dateService.getMonthTextFormat(this._dateService.getActualMonth());
  }


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
