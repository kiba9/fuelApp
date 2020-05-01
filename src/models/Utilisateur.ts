export class Utilisateur {

    idUtilisateur?: number;
    nom: '';
    prenom: '';
    nationalite: '';
    pays: '';
    adresse: '';
    username: '';
    password?: '';
    active: true;
    partAction: 0;
    statutUtilisateur: '';
    listeStations?: [];
    roles?: '';


    constructor() {
    }
}
