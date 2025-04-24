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
  }
}
