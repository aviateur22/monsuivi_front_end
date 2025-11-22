import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authRouting } from './routes/auth.routing';
import { RouterModule } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { ShareModule } from "../share/share.module";
import { MessageModule } from 'primeng/message';
import { StoreModule } from '@ngrx/store';

import { reducers as authReducer } from './store/reducer'
import { AuthEffect } from './store/effect';
import { EffectsModule } from '@ngrx/effects';
import { LogoutComponent } from './components/logout/logout.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LogoutComponent
  ],
  imports: [
    RouterModule.forChild(authRouting),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    FloatLabel,
    ButtonModule,
    MessageModule,
    ShareModule,
    StoreModule.forFeature('authState', authReducer),
    EffectsModule.forFeature([
      AuthEffect
    ]),
]
})
export class AuthModule { }
