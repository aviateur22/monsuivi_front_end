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
}
