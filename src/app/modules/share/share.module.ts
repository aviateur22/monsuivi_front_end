import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddFileComponent } from './components/add-file/add-file.component';
import { SwipeLeftDirective } from './directive/swipe-left.directive';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers as shareReducer } from './store/reducer';
import { ShareEffect } from './store/effect';

import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { NavComponent } from './components/nav/nav.component';
import { RouterModule } from '@angular/router';
import { TakePhotoOnMobileComponent } from './components/take-photo-on-mobile/take-photo-on-mobile.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MainContainerComponent } from './components/main-container/main-container.component';

import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [
    AddFileComponent,
    NavComponent,
    TakePhotoOnMobileComponent,
    LoadingComponent,
    MainContainerComponent
  ],
  imports: [
    AngularCommonModule,
    SwipeLeftDirective,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MessageModule,
    ButtonModule,
    StoreModule.forFeature('shareState', shareReducer),
    EffectsModule.forFeature([
      ShareEffect
    ]),
    ProgressSpinnerModule
  ],
  providers: [MessageService],
exports: [
    AddFileComponent,
    TakePhotoOnMobileComponent,
    NavComponent,
    SwipeLeftDirective,
    LoadingComponent,
    MainContainerComponent
  ]
})
export class ShareModule { }
