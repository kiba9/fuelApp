import {Component, OnInit} from '@angular/core';
import {LoadingController, ModalController, NavParams} from '@ionic/angular';
import {VendorService} from '../../../providers/vendor.service';
import {DataProviderService} from '../../../providers/dataProvider.service';
import {StationService} from '../../../providers/station.service';

@Component({
    selector: 'app-fournisseur',
    templateUrl: './fournisseur.page.html',
    styleUrls: ['./fournisseur.page.scss'],
})
export class FournisseurPage implements OnInit {

    vendor;
    station;
    loaderToShow: any;
    listFournisseur = [];

    customAlertOptions: any = {
        header: 'Fournisseur',
        message: 'Selectionnez le Fournisseur de votre station',
        translucent: true
    };


    constructor(public navParams: NavParams, public modalCtrl: ModalController, public loadCtrl: LoadingController,
                public vendorSvrc: VendorService, public staionSvrc: StationService) {
        // recuperation du type de carburant passé en paramettre
        this.station = navParams.get('stationItem');
        this.vendor = this.station.fournisseur;
    }

    ngOnInit() {
        this.getVendorList();
    }

    async closeModal() {
        await this.modalCtrl.dismiss();
    }

    submitRequest() {
        if (!DataProviderService.validateString(this.vendor.nom) || !DataProviderService.validateString(this.vendor.adresse)) {
            this.vendorSvrc.alertMsg('Choissez un fournisseur', 2000, 'top', 'danger');
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

        this.staionSvrc.updateStation(this.station).subscribe(response => {
            if (response) {
                this.loadCtrl.dismiss();
                this.station = response;
                this.modalCtrl.dismiss(this.station);
            }
        }, error1 => {
            this.staionSvrc.alertMsg(error1.message, 3500, 'top', 'danger');
            this.loadCtrl.dismiss();
        });
    }

    /**
     * recuperer la liste des fournisseur en base de données
     */
    getVendorList() {
        this.vendorSvrc.getAllVendor().subscribe(response => {
            this.listFournisseur = response;
        },  async error1 => {
            this.vendorSvrc.alertMsg(error1.message, 3500, 'top', 'danger');
            await this.modalCtrl.dismiss();
        });
    }

}
