import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRegsiterDto } from '../../models/auth.dto';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../store/state';
import { registerAction } from '../../store/action';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private _fb = inject(FormBuilder);
  private _store = inject(Store<IAppState>)

  registerFG: FormGroup = this._fb.group({
    email: ['', Validators.required],
    nickname: ['', Validators.required],
    password: ['',Validators.required]
  })

  register() {
    if(!this.registerFG.valid || this.registerFG == null) {
          this.registerFG.markAllAsTouched();
          return;
        }

        const dto: IRegsiterDto = {
          email: this.registerFG.get('email')?.value,
          password: this.registerFG.get('password')?.value,
          nickname: this.registerFG.get('nickname')?.value
        }

        this._store.dispatch(registerAction({registerInformation: dto}));
  }

}
