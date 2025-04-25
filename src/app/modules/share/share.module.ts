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

@NgModule({
  declarations: [
    AddFileComponent,
    NavComponent
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
    ])
  ],
  providers: [MessageService],
exports: [
    AddFileComponent,
    NavComponent,
    SwipeLeftDirective
  ]
})
export class ShareModule { }
