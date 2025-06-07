import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StackedBarData } from '../../model/graphic.model';
import { ChartjsStackedBarDatasetMapperService } from '../../services/chartjs-stackedbar-dataset.mapper.service';

@Component({
  selector: 'app-stacked-bar-chart',
  templateUrl: './stacked-bar-chart.component.html',
  styleUrl: './stacked-bar-chart.component.css'
})
export class StackedBarChartComponent implements OnInit {
   @Input() dataObservable$ : Observable<StackedBarData<number> | null> = of(null);

  // Symbol de la donnée (Pas obligatoir - ex €)
  @Input() dataSymbol: string = '';

  // Force le step Size de l'axe y (Pas obligatoire)
  @Input() yStepSize: number | null = null;

  // Option graphique
  options: any;

  // Données du graphique pour le html
  data: any;

  // Données récupérée depuis API
  graphDescription: string = '';

  constructor(private _cd: ChangeDetectorRef, private _stackedBarMapperService: ChartjsStackedBarDatasetMapperService) {}

  ngOnInit(): void {

    // Option du garphique
    this.options = this._stackedBarMapperService.setGraphicOption(this.yStepSize, this.dataSymbol);

    // Récupération des données du graphique et mappage
    this.dataObservable$.subscribe(result=>{
      this.graphDescription = result!.message;
      this.data = this._stackedBarMapperService.mapToChartJsDatatset(result);
    })

    this._cd.markForCheck();
  }
}
