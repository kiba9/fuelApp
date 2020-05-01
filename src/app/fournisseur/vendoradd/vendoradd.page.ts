import {Component, OnInit} from '@angular/core';
import {LoadingController, ModalController, NavParams} from '@ionic/angular';
import {VendorService} from '../../../providers/vendor.service';
import {DataProviderService} from '../../../providers/dataProvider.service';

@Component({
    selector: 'app-vendoradd',
    templateUrl: './vendoradd.page.html',
    styleUrls: ['./vendoradd.page.scss'],
})
export class VendoraddPage implements OnInit {

    fournisseur;
    isCreate = true;
    loaderToShow: any;

    constructor(public navParams: NavParams, public modalCtrl: ModalController, public vendorSvrc: VendorService,
                public loadCtrl: LoadingController) {
        // recuperation de l'utilisateur passé en paramettre
        this.fournisseur = navParams.get('vndr');
        // On indique si il s'agit de la mise a jour ou de la creation d'un utilisateur
        if (navParams.get('func') === 'update') {
            this.isCreate = false;
        }
    }

    ngOnInit() {
    }

    async closeModal() {
        await this.modalCtrl.dismiss();
    }

    /**
     *  @description permet de verfier si les champs necessaire pour créer un fournisseurs sont bien remplis puis
     *  apple la methode adéquate soit creer / update
     */
    submitRequest() {
        if (!DataProviderService.validateString(this.fournisseur.nom) || !DataProviderService.validateString(this.fournisseur.adresse)) {
            this.vendorSvrc.alertMsg('Remplissez entierement le formulaire', 2000, 'top', 'danger');
        } else {
            if (this.isCreate) {
                this.createVendor();
            } else {
                this.updateVendor();
            }
        }
    }

    /**
     * @description methode permettant d'ajouter un nouveau fournisseur en base de données
     */
    async createVendor() {
        this.loaderToShow = await this.loadCtrl.create({
            message: 'Patientez...',
            spinner: 'crescent'
        });
        await this.loaderToShow.present();

        this.vendorSvrc.createVendor(this.fournisseur).subscribe(response => {
            if (response) {
                this.loadCtrl.dismiss();
                this.fournisseur = response;
                this.modalCtrl.dismiss(this.fournisseur);
            }
        }, error1 => {
            this.vendorSvrc.alertMsg(error1.message, 3500, 'top', 'danger');
            this.loadCtrl.dismiss();
        });
    }

    /**
     * @description methode permettant de modifier les information d'un fournisseur present en BD
     */
    async updateVendor() {
        this.loaderToShow = await this.loadCtrl.create({
            message: 'Patientez...',
            spinner: 'crescent'
        });
        await this.loaderToShow.present();

        this.vendorSvrc.updateVendor(this.fournisseur).subscribe(response => {
            this.loadCtrl.dismiss();
            this.modalCtrl.dismiss(this.fournisseur);
        }, error1 => {
            this.vendorSvrc.alertMsg(error1.message, 3500, 'top', 'danger');
            this.loadCtrl.dismiss();
        });
    }

}
