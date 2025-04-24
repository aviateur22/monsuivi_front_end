import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusPipe',
  standalone: true
})
export class StatusPipe implements PipeTransform {

  /**
   * Renvoie le nom de la class permettant d'afficher si un produit est a vendre ou déja vendu
   * @param {string} statusCode - statut du produit
   * @param args
   * @returns string
   */
  transform(statusCode: string, ...args: unknown[]): string {
    return statusCode === 'fs' ? 'product--to--sell' :'product--sell'
  }

}
