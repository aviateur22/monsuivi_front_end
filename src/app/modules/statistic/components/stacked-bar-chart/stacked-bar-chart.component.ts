import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StackedBarData } from '../../model/graphic.model';

@Component({
  selector: 'app-stacked-bar-chart',
  templateUrl: './stacked-bar-chart.component.html',
  styleUrl: './stacked-bar-chart.component.css'
})
export class StackedBarChartComponent implements OnInit {
   @Input() dataObservable$ : Observable<StackedBarData<number> | null> = of(null);

  // Symbol de la donnée (Pas obligatoir - ex €)
  @Input() dataSymbol: String = '';

  // Force le step Size de l'axe y (Pas obligatoire)
  @Input() yStepSize: number | null = null;

  // Option graphique
  options: any;

  // Données du graphique pour le html
  data: any;

  // Données récupérée depuis API
  graphDescription: string = '';

  constructor(private _cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Récupération des symbole pour ajout si nécessaire
    const dataSymbol = this.dataSymbol;

    const yStepSize = this.yStepSize;

    // Redéfinie le tick option de l'axe y
    const yTicksOptions: any = {
    color: 'black',
    callback: function(value: number) {
        return Number.isInteger(value) ? value : null;
    }
  };

  // Redéfinie un Y StepSize particulier si nécessaire
  if (yStepSize !== null) {
    yTicksOptions.stepSize = yStepSize;
  }

    this.dataObservable$.subscribe(result=>{
       if(!result)
        return;

       this.graphDescription = result.message;

       // Composition des données du stackedBar
       this.data = {
        labels: result.labels,
        datasets: [
          {
            label: result.datasets[0].label,
            backgroundColor: result.datasets[0].backgroundColor,
            hoverBackgroundColor: result.datasets[0].hoverBackgroundColor,
            data: result.datasets[0].data
          },
          {
            label: result.datasets[1].label,
            backgroundColor: result.datasets[1].backgroundColor,
            hoverBackgroundColor: result.datasets[1].hoverBackgroundColor,
            data: result.datasets[1].data
          }
        ]
      };
    });

    this.options = {
                maintainAspectRatio: false,
                aspectRatio: 0.8,
                plugins: {
                    tooltip: {
                        callbacks: {
                        /**
                         * Surcharge de l'affichage du text avec l'ajout d'un symbole si nécéssaire
                         * @param {any} context
                         * @returns  {string}
                         */
                        label: function(context: any): string {
                          console.log(context, 'context')
                          let label = context.dataset.label || '';
                          let value = context.formattedValue;

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
                },
                scales: {
                    x: {
                        ticks: {
                            color: 'black'
                        },
                        grid: {
                            color: 'black',
                            drawBorder: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: yTicksOptions,
                        grid: {
                            color: 'black',
                            drawBorder: false
                        }
                    }
                }
            };

    this._cd.markForCheck();
  }
}
