import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DoughnutData } from '../../model/graphic.model';
import { Observable, of } from 'rxjs';
import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrl: './doughnut-chart.component.css'
})
export class DoughnutChartComponent implements OnInit {
  @Input() dataObservable$ : Observable<DoughnutData<number> | null> = of(null);

  // Symbol de la donnée (Pas obligatoir - ex €)
  @Input() dataSymbol: String = '';

  // Option graphique
  options: any;

  // Données du graphique pour le html
  data: any;

  // Données récupérée depuis API
  graphDescription: string = '';

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    const dataSymbol = this.dataSymbol;

    this.dataObservable$.subscribe(result=>{

      if(!result)
        return;

      this.graphDescription = result.message;

      this.data = {
        labels: result.labels,
        datasets: [
          {
              data: result.datasets[0].data,
              backgroundColor: result.datasets[0].backgroundColor,
              hoverBackgroundColor: result.datasets[0].hoverBackgroundColor,
          }
        ]
    };
    });

    this.options = {
        cutout: '60%',
        plugins: {
          tooltip: {
            callbacks: {
              /**
               * Surcharge de l'affichage du text avec l'ajout d'un symbole si nécéssaire
               * @param {any} context
               * @returns  {string}
               */
              label: function(context: any): string {

                let label = context.dataset.label || '';
                let value = context.parsed;

                if (label) {
                  label += ': ';
                }

                return `${label} ${value} ${dataSymbol}`;
              }
            }
          },
          legend: {
            labels: {
                color: 'black'
            }
        }
        }
    };

    this.cd.markForCheck();
  }
}
