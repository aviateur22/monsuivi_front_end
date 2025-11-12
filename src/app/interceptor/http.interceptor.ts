import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import pagesInformations from '../../misc/pages-informations';
import { RequestHeaderService } from './request-header.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);
  const requestHeader = inject(RequestHeaderService);

  // Clone the request with credentials and headers
  const authReq = requestHeader.addHeaders(req);

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      const errorStatus = error.status;

      switch (errorStatus) {
        case 0: {
          console.error('Error 0:', error.message);
          router.navigate([`${pagesInformations.home.url}`]);
          break;
        }
        case 401: {
          console.warn('Error 401: Unauthorized');
          router.navigate([`${pagesInformations.login.url}`]);
          break;
        }
        case 403: {
          console.warn('Error 403: Forbidden');
          router.navigate([`${pagesInformations.home.url}`]);
          break;
        }
        default: {
          console.error('Unhandled error:', error);
          break;
        }
      }

      return throwError(() => error);
    })
  );
};
