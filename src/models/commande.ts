export class Commande {
    idCommande?: number;
    dateCommande: Date;
    dateLivraison: Date;
    volumeCommande: number;
    volumeLivre: number;
    prixTotal: number = 0;
    ristourne: number = 0;
    statut: '';
    fournisseur: any;
    stationService:any;
    paiement: any;
    listLigneCommandes = [];

    constructor(){}
}
