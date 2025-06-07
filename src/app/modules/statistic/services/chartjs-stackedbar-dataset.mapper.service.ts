import { Injectable } from "@angular/core";
import { StackedBarData } from "../model/graphic.model";

@Injectable({
  providedIn: "root"
})
export class ChartjsStackedBarDatasetMapperService {

  /**
   * Map les données de API au format ChartJS
   * @param {StackedBarData<T>} result
   * @returns { any } Donnée formaté au format ChartJS
   */
  mapToChartJsDatatset<T>(result: StackedBarData<T> | null): any {
   if(!result)
        return;

    // Composition des données du stackedBar
    return {
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
  }

  /**
   * AOption sur les affichages du graphique
   * @param {number | null} yStepSize - Echelle de l'axe Y
   * Echelle automatique sera appliquée si NULL
   * @param { string } dataSymbol
   * Ajout optionnel d'un symbole (ex: €) sur les labels qui apparaissent au clic de la souris.
   * @returns { any } Options graphique pour ChartJS
   */

  setGraphicOption(yStepSize: number | null, dataSymbol: string): any {

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

   return {
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
  }


}
