import {Component, OnInit} from '@angular/core';
import {LoadingController, ModalController, NavParams} from '@ionic/angular';
import {DataProviderService} from '../../../providers/dataProvider.service';
import {FuelService} from '../../../providers/fuel.service';

@Component({
    selector: 'app-fueltypeadd',
    templateUrl: './fueltypeadd.page.html',
    styleUrls: ['./fueltypeadd.page.scss'],
})
export class FueltypeaddPage implements OnInit {

    fuel;
    isCreate = true;
    loaderToShow: any;

    constructor(public navParams: NavParams, public modalCtrl: ModalController, public fuelSvrc: FuelService,
                public loadCtrl: LoadingController) {
        // recuperation du type de carburant passé en paramettre
        this.fuel = navParams.get('fueltype');
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
     *  @description permet de verfier si les champs necessaire pour créer un type de carburant sont bien remplis puis
     *  applle la methode adéquate soit creer / update
     */
    submitRequest() {
        if (!DataProviderService.validateString(this.fuel.libelle) || this.fuel.prixVente === null
            || this.fuel.prixVente < 0 || this.fuel.prixAchat === null || this.fuel.prixAchat < 0) {
            this.fuelSvrc.alertMsg('Remplissez entierement le formulaire', 2000, 'top', 'danger');
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

        this.fuelSvrc.createFuelType(this.fuel).subscribe(response => {
            if (response) {
                this.loadCtrl.dismiss();
                this.fuel = response;
                this.modalCtrl.dismiss(this.fuel);
            }
        }, error1 => {
            this.fuelSvrc.alertMsg(error1.message, 3500, 'top', 'danger');
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

        this.fuelSvrc.updateFuelType(this.fuel).subscribe(response => {
            this.loadCtrl.dismiss();
            this.modalCtrl.dismiss(this.fuel);
        }, error1 => {
            this.fuelSvrc.alertMsg(error1.message, 3500, 'top', 'danger');
            this.loadCtrl.dismiss();
        });
    }

}
