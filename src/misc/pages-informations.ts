import { Title } from "@angular/platform-browser";
import { environment } from "../environment/environment";

export default {
  home: {
    url: '',
    title:  `${environment.main_page_title} | Bienvenue`
  },
  addProduct: {
    url: 'ajout-nouveau-produit',
    title:  `${environment.main_page_title} | Ajout produit`
  },
  sellerProducts: {
    url: 'mes-produits',
    title: `${environment.main_page_title} | Mes produits`
  },
  selectStatisticalGraphic: {
    url: 'choix-graphique-statistique',
    title: `${environment.main_page_title} | Graphique des achats et ventes`
  },
  soldAndBuyProductQuantityByCategoryForOneMonth: {
    url: 'quantite-achat-vente-produit-par-categorie-mois',
    title: `${environment.main_page_title} | Graphique des achats et ventes`
  },
  soldAndBuyProductPriceByCategoryForOneMonth: {
    url: 'prix-achat-vente-produit-par-categorie-mois',
    title: `${environment.main_page_title} | Graphique des achats et ventes`
  },
  soldAndBuyProductPriceByCategoryForOneYear: {
    url: 'prix-achat-vente-produit-par-categorie-annee',
    title: `${environment.main_page_title} | Graphique des achats et ventes`
  },
  soldAndBuyProductQuantityByCategoryForOneYear: {
    url: 'quantite-achat-vente-produit-par-categorie-annee',
    title: `${environment.main_page_title} | Graphique des achats et ventes`
  },
  soldAndBuyProductPriceForOneYear: {
    url: 'prix-achat-vente-produit-par-annee',
    title: `${environment.main_page_title} | Graphique des achats et ventes`
  },
  soldAndBuyProductQuantityForOneYear: {
    url: 'quantite-achat-vente-produit-par-annee',
    title: `${environment.main_page_title} | Graphique des achats et ventes`
  },
}
