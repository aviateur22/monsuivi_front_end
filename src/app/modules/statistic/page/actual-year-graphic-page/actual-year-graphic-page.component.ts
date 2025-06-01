import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../store/state';
import { getActualMonthDataAction } from './../../store/action';
import { UserService } from '../../../../users/service/user.service';

@Component({
  selector: 'app-actual-year-graphic-page',
  templateUrl: './actual-year-graphic-page.component.html',
  styleUrl: './actual-year-graphic-page.component.css'
})
export class ActualYearGraphicPageComponent {


}
