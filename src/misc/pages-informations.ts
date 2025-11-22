import { environment } from "../environment/environment";

export default {
  home: {
    url: '',
    title:  `${environment.main_page_title} | Bienvenue`
  },
  login: {
    url: 'auth/connexion',
    title:  `${environment.main_page_title} | Connexion`
  },
  register: {
    url: 'auth/inscription',
    title:  `${environment.main_page_title} | Inscription`
  },
  logout: {
    url: 'auth/deconnexion',
    title: `${environment.main_page_title} | Quitter`
  },
  addProduct: {
    url: 'ajout-nouveau-produit',
    title:  `${environment.main_page_title} | Ajout produit`
  },
  sellerProducts: {
    url: 'mes-produits',
    title: `${environment.main_page_title} | Mes produits`
  },
  desactivateProducts: {
    url: 'mes-produits-inactifs',
    title: `${environment.main_page_title} | Mes produits inactifs`
  },
  detailProduct: {
    url: 'produit/:product-id/detail',
    title: `${environment.main_page_title} | Mon produit`
  },
  selectStatisticalGraphic: {
    url: 'choix-graphique-statistique',
    title: `${environment.main_page_title} | Graphique des achats et ventes`
  },
  actualMonthGraphic: {
    url: 'graphique/mois-en-cours',
    title: `${environment.main_page_title} | Graphique - mois en cours`
  },
  actualYearGraphic: {
    url: 'graphique/année-en-cours',
    title: `${environment.main_page_title} | Graphique - année en cours`
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
