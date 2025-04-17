import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddFileComponent } from './components/add-file/add-file.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers as shareReducer } from './store/reducer';
import { ShareEffect } from './store/effect';

import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AddFileComponent
  ],
  imports: [
    AngularCommonModule,
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
    AddFileComponent
  ]
})
export class ShareModule { }
