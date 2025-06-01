import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectStaticGraphicPageComponent } from './page/select-static-graphic-page/select-static-graphic-page.component';
import { DoughnutChartComponent } from './components/doughnut-chart/doughnut-chart.component';
import { StackedBarChartComponent } from './components/stacked-bar-chart/stacked-bar-chart.component';
import { RouterModule } from '@angular/router';
import { statisticalRouting } from './routes/statistical.routing';

import { ButtonModule } from 'primeng/button';
import { SelectButtonComponent } from './components/select-button/select-button.component';
import { ChartModule } from 'primeng/chart';
import { ActualMonthGraphicPageComponent } from './page/actual-month-graphic-page/actual-month-graphic-page.component';
import { ActualYearGraphicPageComponent } from './page/actual-year-graphic-page/actual-year-graphic-page.component';
import { ShareModule } from "../share/share.module";
import { StoreModule } from '@ngrx/store';

import { reducers as StatisticalReducer } from './store/reducer'
import { StatisticalEffect } from './store/effect';
import { EffectsModule } from '@ngrx/effects';


@NgModule({
  declarations: [
    SelectStaticGraphicPageComponent,
    DoughnutChartComponent,
    StackedBarChartComponent,
    SelectButtonComponent,
    ActualMonthGraphicPageComponent,
    ActualYearGraphicPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(statisticalRouting),
    ButtonModule,
    ChartModule,
    ShareModule,
    StoreModule.forFeature('statisticalState', StatisticalReducer),
    EffectsModule.forFeature([
      StatisticalEffect
    ]),
]
})
export class StatisticModule { }
