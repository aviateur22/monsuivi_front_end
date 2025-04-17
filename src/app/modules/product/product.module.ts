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

import { MessageModule } from 'primeng/message';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    CreatProductComponent,
    AddProductPageComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
    ToastModule
]
})
export class ProductModule { }
