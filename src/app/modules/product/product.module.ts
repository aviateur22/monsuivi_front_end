import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { productRouting } from './routes/product.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers as productReducer } from './store/reducer'
import { ProductEffect } from './store/effect';

import { CreatProductComponent } from './components/creat-product/creat-product.component';
import { AddProductPageComponent } from './pages/add-product-page/add-product-page.component';
import { ShareModule } from '../share/share.module';
import { SummarizeProductComponent } from './components/summarize-product/summarize-product.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { StatusPipe } from './pipe/status.pipe';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { DetailProductPageComponent } from './pages/detail-product-page/detail-product-page.component';

import { MessageModule } from 'primeng/message';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    CreatProductComponent,
    AddProductPageComponent,
    SummarizeProductComponent,
    ProductsPageComponent,
    FilterBarComponent,
    DetailProductPageComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    StatusPipe,
    ShareModule,
    RouterModule.forChild(productRouting),
    StoreModule.forFeature('productSate', productReducer),
    EffectsModule.forFeature([
      ProductEffect
    ]),
    MessageModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    CardModule,
    CalendarModule,
    CheckboxModule
  ],
  exports: [
    DetailProductPageComponent
  ]
})
export class ProductModule { }
