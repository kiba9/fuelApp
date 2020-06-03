import {Component, OnInit} from '@angular/core';
import {LoadingController, ModalController, NavParams, ToastController} from '@ionic/angular';
import {VendorService} from '../../../providers/vendor.service';
import {DataProviderService} from '../../../providers/dataProvider.service';
import {StationService} from '../../../providers/station.service';
import {HTTP} from '@ionic-native/http/ngx';
import {Vendor} from '../../../models/vendor';

@Component({
    selector: 'app-fournisseur',
    templateUrl: './fournisseur.page.html',
    styleUrls: ['./fournisseur.page.scss'],
})
export class FournisseurPage implements OnInit {

    vendor: Vendor = new Vendor();
    selectVndr;
    station;
    loaderToShow: any;
    listFournisseur = [];

    customAlertOptions: any = {
        header: 'Fournisseur',
        message: 'Selectionnez le Fournisseur de votre station',
        translucent: true
    };


    constructor(public navParams: NavParams, public modalCtrl: ModalController, public loadCtrl: LoadingController,
                public toastCtrl: ToastController,  public nativeHttp: HTTP) {
        // recuperation du type de carburant passé en paramettre
        this.station = navParams.get('stationItem');
        this.getVendorList();
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
        this.vendor = this.station.fournisseur;
    }

    async closeModal() {
        await this.modalCtrl.dismiss();
    }

    submitRequest() {
        if (!DataProviderService.validateString(this.vendor.nom) || !DataProviderService.validateString(this.vendor.adresse)) {
            this.alertMsg('Choissez un fournisseur', 2000, 'top', 'danger');
        } else {
            this.station.fournisseur = this.vendor;
            console.log(this.station);
            this.setStationVendor();
        }
    }

    /**
     * @description methode permettant d'ajouter un nouveau fournisseur en base de données
     */
    async setStationVendor() {
        this.loaderToShow = await this.loadCtrl.create({
            message: 'Patientez...',
            spinner: 'crescent'
        });
        await this.loaderToShow.present();
        this.nativeHttp.setDataSerializer('json');
        this.nativeHttp.put(DataProviderService.updateStation, this.station, {}).then((response) => {
            response.data = JSON.parse(response.data);
            if(response.data){
                this.loadCtrl.dismiss();
                this.station = response.data;
                this.modalCtrl.dismiss(this.station);
            }
        }).catch((error1) => {
            this.alertMsg(error1.message, 3500, 'top', 'danger');
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
