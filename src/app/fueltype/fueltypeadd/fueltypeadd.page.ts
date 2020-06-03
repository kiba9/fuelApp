import {Component, OnInit} from '@angular/core';
import {LoadingController, ModalController, NavParams, ToastController} from '@ionic/angular';
import {DataProviderService} from '../../../providers/dataProvider.service';
import {FuelService} from '../../../providers/fuel.service';
import {HTTP} from '@ionic-native/http/ngx';
import {Vendor} from '../../../models/vendor';
import {Fuel} from '../../../models/fuel';

@Component({
    selector: 'app-fueltypeadd',
    templateUrl: './fueltypeadd.page.html',
    styleUrls: ['./fueltypeadd.page.scss'],
})
export class FueltypeaddPage implements OnInit {

    fuel: Fuel;
    isCreate = true;
    listFournisseur = [];
    loaderToShow: any;

    customAlertOptions: any = {
        header: 'Fournisseur',
        message: 'Selectionnez un Fournisseur',
        translucent: true
    };

    constructor(public navParams: NavParams, public modalCtrl: ModalController, public nativeHttp: HTTP,
                public toastCtrl: ToastController, public loadCtrl: LoadingController) {
        this.nativeHttp.setDataSerializer('json');
        // recuperation du type de carburant passé en paramettre
        this.fuel = navParams.get('fueltype');
        // On indique si il s'agit de la mise a jour ou de la creation d'un utilisateur
        if (navParams.get('func') === 'update') {
            this.isCreate = false;
        }
    }

    compareFn(e1: Vendor, e2: Vendor): boolean {
        return e1 && e2 ? e1.idFournisseur == e2.idFournisseur : e1 == e2;
    }

    async alertMsg(msg, time, pos, colr) {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: time,
            position: pos,
            color: colr
        });
        toast.present();
    }

    ngOnInit() {
        this.getVendorList();
    }

    async closeModal() {
        await this.modalCtrl.dismiss();
    }

    /**
     *  @description permet de verfier si les champs necessaire pour créer un type de carburant sont bien remplis puis
     *  applle la methode adéquate soit creer / update
     */
    submitRequest() {
        if (!DataProviderService.validateString(this.fuel.libelle) || this.fuel.prixVente === null
            || this.fuel.prixVente < 0 || this.fuel.prixAchat === null || this.fuel.prixAchat < 0) {
            this.alertMsg('Remplissez entierement le formulaire', 2000, 'top', 'danger');
        } else {
            if (this.isCreate) {
                this.createFuelType();
            } else {
                this.updateFuelType();
            }
        }
    }

    /**
     * @description methode permettant d'ajouter un nouveau fournisseur en base de données
     */
    async createFuelType() {
        this.loaderToShow = await this.loadCtrl.create({
            message: 'Patientez...',
            spinner: 'crescent'
        });
        await this.loaderToShow.present();

        this.nativeHttp.post(DataProviderService.createFuelType, this.fuel, {}).then((response) => {
            response.data = JSON.parse(response.data);
            if(response.data){
                this.loadCtrl.dismiss();
                this.fuel = response.data;
                this.modalCtrl.dismiss(this.fuel);
            }
        }).catch((error1) => {
            this.alertMsg(error1.error, 3500, 'top', 'danger');
            this.loadCtrl.dismiss();
        });
    }

    /**
     * @description methode permettant de modifier les information d'un fournisseur present en BD
     */
    async updateFuelType() {
        this.loaderToShow = await this.loadCtrl.create({
            message: 'Patientez...',
            spinner: 'crescent'
        });
        await this.loaderToShow.present();

        this.nativeHttp.put(DataProviderService.updateFuelType, this.fuel, {}).then((response) => {
            this.loadCtrl.dismiss();
            this.modalCtrl.dismiss(this.fuel);
        }).catch((error1) => {
            this.alertMsg(error1.error, 3500, 'top', 'danger');
            this.loadCtrl.dismiss();
        });
    }

    /**
     * recuperer la liste des fournisseur en base de données
     */
    getVendorList() {
        this.nativeHttp.get(DataProviderService.getAllVendor, {}, {}).then((response) => {
            response.data = JSON.parse(response.data);
            this.listFournisseur = response.data;
        }).catch((error1) => {
            this.alertMsg(error1.message, 3500, 'top', 'danger');
            this.modalCtrl.dismiss();
        });
    }


}
