import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class StatisticalDateService {
  /**
   * Mois actuel en chiffre entre 1 (janvier) et 12 (décembre)
   * @returns number - Mois en cours
   */
  getActualMonth(): number {
    return new Date().getMonth() + 1;
  }

  /**
   * Renvoie l'année actuelle
   * @returns {number}
   */
  getActualYear(): number {
    return new Date().getFullYear();
  }

  /**
   * Renvoie le mois en lettre
   * @param { number } month - Le mois entre 1 et 12
   * @returns Mois en lettre
   */
  getMonthTextFormat(month: number): string {
   switch(month) {
      case 1: return 'Janvier';
      case 2: return 'Février';
      case 3: return 'Mars';
      case 4: return 'Avril';
      case 5: return 'Mai';
      case 6: return 'Juin';
      case 7: return 'Juillet';
      case 8: return 'Août';
      case 9: return 'Septembre';
      case 10: return 'Octobre';
      case 11: return 'Novembre';
      case 12: return 'Décembre';
      default: return ''
    }
  }
}
