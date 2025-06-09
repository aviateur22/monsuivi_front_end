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
import { DetailProductComponent } from './components/detail-product/detail-product-page.component';

import { MessageModule } from 'primeng/message';
import { Select, SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PopoverModule } from 'primeng/popover';

@NgModule({
  declarations: [
    CreatProductComponent,
    AddProductPageComponent,
    SummarizeProductComponent,
    ProductsPageComponent,
    FilterBarComponent,
    DetailProductComponent
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
    Select,
    ButtonModule,
    InputTextModule,
    DialogModule,
    CardModule,
    CalendarModule,
    CheckboxModule,
    SelectButtonModule,
    PopoverModule
  ],
  exports: [
    DetailProductComponent
  ]
})
export class ProductModule { }
