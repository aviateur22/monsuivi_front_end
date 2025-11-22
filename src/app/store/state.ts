import { IProductState } from './../modules/product/store/state'
import { IShareState } from '../modules/share/store/state';
import { reducers as ProductReducers } from "./../modules/product/store/reducer";
import { reducers as ShareReducers } from '../modules/share/store/reducer';
import { reducers as StatisticalReducers } from '../modules/statistic/store/reducer';
import { reducers as AuthReducer } from '../modules/auth/store/reducer';
import { ActionReducerMap } from '@ngrx/store';
import { IStatisticState } from '../modules/statistic/store/state';
import { IAuthState } from '../modules/auth/store/state';

export interface IAppState {
  productState: IProductState,
  shareState: IShareState,
  statisticalState: IStatisticState,
  authState: IAuthState
}

export const reducers: ActionReducerMap<IAppState> = {
  productState: ProductReducers,
  shareState: ShareReducers,
  statisticalState: StatisticalReducers,
  authState: AuthReducer
}
