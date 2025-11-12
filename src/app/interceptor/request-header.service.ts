import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_CONSTANTS } from '../../misc/constant';

@Injectable({
  providedIn: 'root'
})
export class RequestHeaderService {

  constructor() { }

  public addHeaders(request: HttpRequest<unknown>): HttpRequest<unknown> {
    let copyRequest = request;

    // Ajout du header Authorisation
    if (this.isAuthorizationHeaderRequest(request.url))
      copyRequest = this.addAuthorizationHeader(copyRequest);


    if(this.requiresCsrf(request.method))
      copyRequest = this.addCsrfToken(copyRequest);

    // Ajout du content type
    if (request.body instanceof FormData)
      return copyRequest;

    copyRequest = this.addContentType(copyRequest);

    return copyRequest;
  }

  /**
   * Ajout token CSRF
   *
   * @param request Requete a envoyée
   *
   * @returns La requete avec le Token CSRF
   */
  private addCsrfToken(request: HttpRequest<unknown>): HttpRequest<unknown> {
    const csrfToken = localStorage.getItem(APP_CONSTANTS.HEADER_POST_CSRF_TOKEN);
    if (!csrfToken) return request;

    return request.clone({
        withCredentials: true,
        setHeaders: {
          'Post-Csrf-Token': localStorage.getItem(csrfToken) ?? ''
      }
    });
   }

   /**
    * Ajout header authorzation
    *
    * @param request La requeteHttp à mettre a jour avec le header authorisation
    *
    * @returns La requete avec le header authorisation
    */
  private addAuthorizationHeader(request: HttpRequest<unknown>): HttpRequest<unknown>  {
    const bearer = localStorage.getItem(APP_CONSTANTS.HEADER_AUTHORIZATION_BEARER);
    if (!bearer) return request;

      return request.clone({
        withCredentials: true,
        setHeaders: {
          authorization: `Bearer ${bearer}`,
      }
    });
  }

  /**
   * Ajout du content type
   *
   * @param request La requete Http à mettre à jour
   *
   * @returns La requete avec le header content type
   */
  private addContentType(request: HttpRequest<unknown>): HttpRequest<unknown>  {
      return request.clone({
        withCredentials: true,
        setHeaders: {
          'Content-Type': 'application/json'
      }
    });
  }

  private isAuthorizationHeaderRequest(url: string): boolean {
    return !url.includes('/auth');
  }

  private requiresCsrf(method: string): boolean {
    return ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method.toUpperCase());
  }
}
