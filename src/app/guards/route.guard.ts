import { CanActivateFn } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { actifSellerSelector } from '../modules/auth/store/selector';
import { inject } from '@angular/core';

export const sellerRouteGuard: CanActivateFn = (childRoute, state) => {
  const _store = inject(Store);
  return _store.pipe(select(actifSellerSelector))
  .pipe(take(1), map(seller => seller !== null))
};
