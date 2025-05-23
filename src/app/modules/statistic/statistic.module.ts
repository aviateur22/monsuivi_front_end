import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectStaticGraphicPageComponent } from './page/select-static-graphic-page/select-static-graphic-page.component';
import { StatisticalGraphicPageComponent } from './page/statistical-graphic-page/statistical-graphic-page.component';
import { SingleGraphicChartComponent } from './components/single-graphic-chart/single-graphic-chart.component';
import { MultipleGraphicChartComponent } from './components/multiple-graphic-chart/multiple-graphic-chart.component';
import { DoughnutChartComponent } from './components/doughnut-chart/doughnut-chart.component';
import { StackedBarChartComponent } from './components/stacked-bar-chart/stacked-bar-chart.component';
import { RouterModule } from '@angular/router';
import { statisticalRouting } from './routes/statistical.routing';

import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    SelectStaticGraphicPageComponent,
    StatisticalGraphicPageComponent,
    SingleGraphicChartComponent,
    MultipleGraphicChartComponent,
    DoughnutChartComponent,
    StackedBarChartComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(statisticalRouting),
    ButtonModule
  ]
})
export class StatisticModule { }
