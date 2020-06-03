import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {LoadingController, ToastController} from '@ionic/angular';
import {NavigationExtras} from '@angular/router';
import {HTTP} from '@ionic-native/http/ngx';

@Injectable({
    providedIn: 'root'
})
export class DataProviderService {

    private static toastCtrl: ToastController;

    server = 'http://ec2-18-185-227-132.eu-central-1.compute.amazonaws.com/fueltracker-0.0.1-SNAPSHOT/';
    static serveur2 = 'http://localhost:8085/fueltracker-0.0.1-SNAPSHOT/';
    static serveur = 'http://192.168.43.188:8085/';

    static enpointUser = 'api/utilisateur/';
    static enpointVendor = 'api/fournisseur/';
    static enpointStation = 'api/stationService/';
    static enpointReservoir = 'api/reservoir/';
    static enpointPompe = 'api/pompe/';
    static enpointIndexCarburant = 'api/index/';
    static enpointTypeCarburant = 'api/typeCarburant/';
    static enpointCommande = 'api/commande/';
    static enpointCommandeLine = 'api/ligneCommande/';


    // url of user service

    static loginUser = DataProviderService.serveur + DataProviderService.enpointUser + 'loginUtilisateur/';
    static getAllUser = DataProviderService.serveur + DataProviderService.enpointUser + 'listerUtilisateur/';
    static createUser = DataProviderService.serveur + DataProviderService.enpointUser + 'creerUtilisateur/';
    static updateUser = DataProviderService.serveur + DataProviderService.enpointUser + 'modifierUtilisateur/';
    static deleteUser = DataProviderService.serveur + DataProviderService.enpointUser + 'supprimerUtilisateur/';


    // url of vendor service

    static getAllVendor = DataProviderService.serveur + DataProviderService.enpointVendor + 'listerFournisseur/';
    static createVendor = DataProviderService.serveur + DataProviderService.enpointVendor + 'creerFournisseur/';
    static updateVendor = DataProviderService.serveur + DataProviderService.enpointVendor + 'modifierFournisseur/';
    static deleteVendor = DataProviderService.serveur + DataProviderService.enpointVendor + 'supprimerFournisseur/';


    // url of typeCarburant service

    static getAllFuelTypes = DataProviderService.serveur + DataProviderService.enpointTypeCarburant + 'listerTypeCarburant/';
    static createFuelType = DataProviderService.serveur + DataProviderService.enpointTypeCarburant + 'creerTypeCarburant/';
    static updateFuelType = DataProviderService.serveur + DataProviderService.enpointTypeCarburant + 'modifierTypeCarburant/';
    static deleteFuelType = DataProviderService.serveur + DataProviderService.enpointTypeCarburant + 'supprimerTypeCarburant/';


    // url of typeCarburant service

    static getAllStation = DataProviderService.serveur + DataProviderService.enpointStation + 'listerStationService/';
    static createStation = DataProviderService.serveur + DataProviderService.enpointStation + 'creerStationService/';
    static updateStation = DataProviderService.serveur + DataProviderService.enpointStation + 'modifierStationService/';
    static deleteStation = DataProviderService.serveur + DataProviderService.enpointStation + 'supprimerStationService/';
    static setActionnaires = DataProviderService.serveur + DataProviderService.enpointStation + 'actionnairesStation/';


    // url of reservoir service

    static getAllReservoir = DataProviderService.serveur + DataProviderService.enpointReservoir + 'listerReservoir/';
    static createReservoir = DataProviderService.serveur + DataProviderService.enpointReservoir + 'creerReservoir/';
    static updateReservoir = DataProviderService.serveur + DataProviderService.enpointReservoir + 'modifierReservoir/';
    static deleteReservoir = DataProviderService.serveur + DataProviderService.enpointReservoir + 'supprimerReservoir/';


    // url of pompe service

    static getAllPompes = DataProviderService.serveur + DataProviderService.enpointPompe + 'listerPompe/';
    static createPompe = DataProviderService.serveur + DataProviderService.enpointPompe + 'creerPompe/';
    static updatePompe = DataProviderService.serveur + DataProviderService.enpointPompe + 'modifierPompe/';
    static deletePompe = DataProviderService.serveur + DataProviderService.enpointPompe + 'supprimerPompe/';


    // url of pompe service

    static getAllIndexCarburant = DataProviderService.serveur + DataProviderService.enpointIndexCarburant + 'listerIndex/';
    static createIndexCarburant = DataProviderService.serveur + DataProviderService.enpointIndexCarburant + 'creerIndex/';
    static updateIndexCarburant = DataProviderService.serveur + DataProviderService.enpointIndexCarburant + 'modifierIndex/';
    static deleteIndexCarburant = DataProviderService.serveur + DataProviderService.enpointIndexCarburant + 'supprimerIndex/';


    // url of commande and commande line service

    static getAllCommande = DataProviderService.serveur + DataProviderService.enpointCommande + 'listerCommande/';
    static createCommande = DataProviderService.serveur + DataProviderService.enpointCommande + 'creerCommande/';
    static updateCommande = DataProviderService.serveur + DataProviderService.enpointCommande + 'modifierCommande/';
    static deleteCommade = DataProviderService.serveur + DataProviderService.enpointCommande + 'supprimerCommande/';

    static getAllCommandeLine = DataProviderService.serveur + DataProviderService.enpointCommandeLine + 'listerLigneCommande/';
    static createCommandeLine = DataProviderService.serveur + DataProviderService.enpointCommandeLine + 'creerLigneCommande/';
    static updateCommandeLine = DataProviderService.serveur + DataProviderService.enpointCommandeLine + 'modifierLigneCommande/';
    static deleteCommadeLine = DataProviderService.serveur + DataProviderService.enpointCommandeLine + 'supprimerLigneCommande/';
    static saveAll = DataProviderService.serveur + DataProviderService.enpointCommande + 'saveAll/';


    //get List pompe station
    static getPompesOfStation = DataProviderService.serveur + DataProviderService.enpointPompe + 'byStation/';

    //get List index of Pompe
    static  getIndexOfPompe = DataProviderService.serveur + DataProviderService.enpointIndexCarburant + 'byPompe/';


    /* permet de transmettre un objet utilisateur a une autre page
    * @param: usr
    * return NavigationExtra
    * */
    static setExtras(itm: any): NavigationExtras {
        return {
            state: {
                item: itm
            }
        };
    }

    static validateString(charSequence) {
        return !(charSequence == null || charSequence === '');
    }

    static async alertBox(msg, time, pos, colr) {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: time,
            position: pos,
            color: colr
        });
        toast.present();
    }


    optionRequete = {
        headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        })
    };

    constructor(private http: HttpClient, public natiiveHttp: HTTP, public toastCtrllr: ToastController) {
    }

    async alertMsg(msg, time, pos, colr) {
        const toast = await this.toastCtrllr.create({
            message: msg,
            duration: time,
            position: pos,
            color: colr
        });
        toast.present();
    }


    submitGet(urlBase, body?): Observable<any> {
        return this.http.get(this.server + urlBase, body).pipe(
            catchError(this.handleError)
        );
    }

    submitPost(urlBase, body?): Observable<any> {
        return this.http.post(this.server + urlBase, body).pipe(
            catchError(this.handleError)
        );
    }

    submitPut(urlBase, body?): Observable<any> {
        return this.http.put(this.server + urlBase, body).pipe(
            catchError(this.handleError)
        );
    }

    submitDelete(urlBase, body?): Observable<any> {
        return this.http.delete(this.server + urlBase, body).pipe(
            catchError(this.handleError)
        );
    }

    submitNativeGet(urlBase, loading: LoadingController) {
        this.natiiveHttp.get(this.server + urlBase, {}, {}).then(
            (response) => {
                console.log(response);
                return response.data;
                loading.dismiss();
            }).catch((error) => {
                console.log(error.error);
        });
    }

    handleError(error) {
        return throwError(error);
    }


}
