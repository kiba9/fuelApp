import {Component, OnInit} from '@angular/core';
import {LoadingController, ModalController, NavParams, ToastController} from '@ionic/angular';
import {DataProviderService} from '../../../providers/dataProvider.service';
import {HTTP} from '@ionic-native/http/ngx';

@Component({
    selector: 'app-reservoiradd',
    templateUrl: './reservoiradd.page.html',
    styleUrls: ['./reservoiradd.page.scss'],
})
export class ReservoiraddPage implements OnInit {

    customAlertOptions: any = {
        header: 'Type Carburant',
        message: 'Selectionnez le type de carburant contenu dans ce reservoir',
        translucent: true
    };

    reservoir;
    isCreate = true;
    loaderToShow: any;
    typeCarburant: any = null;
    listFuelType = [];

    constructor(public navParams: NavParams, public modalCtrl: ModalController, public nativeHttp: HTTP,
                public loadCtrl: LoadingController, public toastCtrl: ToastController) {
        this.nativeHttp.setDataSerializer('json');
        // recuperation du type de carburant passé en paramettre
        this.reservoir = navParams.get('reservoirItem');
        // On indique si il s'agit de la mise a jour ou de la creation d'un utilisateur
        if (navParams.get('func') === 'update') {
            this.isCreate = false;
        }
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

    submitRequest() {
        if (!DataProviderService.validateString(this.reservoir.libelle) || this.reservoir.volumeReservoir === null
            || this.reservoir.volumeReservoir < 0 || this.reservoir.typeCarburant === null) {
            this.alertMsg('Remplissez entierement le formulaire', 2000, 'top', 'danger');
        } else {
            if (this.isCreate) {
                this.createReservoir();
            } else {
                this.updateReservoir();
            }
        }
    }

    ngOnInit() {
        this.getTypeFuel();
    }

    async closeModal() {
        await this.modalCtrl.dismiss();
    }

    /**
     * @description methode permettant d'ajouter un nouveau fournisseur en base de données
     */
    async createReservoir() {
        this.loaderToShow = await this.loadCtrl.create({
            message: 'Patientez...',
            spinner: 'crescent'
        });
        await this.loaderToShow.present();

        this.nativeHttp.post(DataProviderService.createReservoir, this.reservoir, {}).then((response) => {
            response.data = JSON.parse(response.data);
            if(response.data){
                this.loadCtrl.dismiss();
                this.reservoir = response.data;
                this.modalCtrl.dismiss(this.reservoir);
            }
        }, (error1) => {
            this.alertMsg(error1.message, 3500, 'top', 'danger');
            this.loadCtrl.dismiss();
        });
    }

    /**
     * @description methode permettant de modifier les information d'un fournisseur present en BD
     */
    async updateReservoir() {
        this.loaderToShow = await this.loadCtrl.create({
            message: 'Patientez...',
            spinner: 'crescent'
        });
        await this.loaderToShow.present();

        this.nativeHttp.put(DataProviderService.updateReservoir, this.reservoir, {}).then((response) => {
            this.loadCtrl.dismiss();
            this.modalCtrl.dismiss(this.reservoir);
        }, (error1) => {
            this.alertMsg(error1.error, 3500, 'top', 'danger');
            this.loadCtrl.dismiss();
        });
    }

    getTypeFuel() {
        this.nativeHttp.get(DataProviderService.getAllFuelTypes, {}, {}).then((response) => {
            this.listFuelType = JSON.parse(response.data);
        }).catch((error1) => {
            this.listFuelType = [];
        });
    }

}
