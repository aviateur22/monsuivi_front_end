import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILoginDto } from '../../models/auth.dto';
import { Store } from '@ngrx/store';
import { loginAction } from '../../store/action';
import { IAppState } from '../../../../store/state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginFG : FormGroup = this._fb.group({
      email: ['', Validators.required],
      password: ['',Validators.required]
   })

  constructor(
    private _store: Store<IAppState>,
    private _fb: FormBuilder) {}

  ngOnInit(): void {

  }

  login() {

    if(!this.loginFG.valid || this.loginFG == null) {
      this.loginFG.markAllAsTouched();
      return;
    }

    const dto: ILoginDto = {
      email: this.loginFG.get('email')?.value,
      password: this.loginFG.get('password')?.value
    }

    this._store.dispatch(loginAction({login: dto}));

  }


}
