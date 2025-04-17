import { IProductState } from './../modules/product/store/state'
import { IShareState } from '../modules/share/store/state';
import { reducers as ProductReducers } from "./../modules/product/store/reducer";
import { reducers as ShareReducers } from '../modules/share/store/reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface IAppState {
  productState: IProductState,
  shareState: IShareState
}

export const reducers: ActionReducerMap<IAppState> = {
  productState: ProductReducers,
  shareState: ShareReducers
}
