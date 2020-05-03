import {Component, OnInit} from '@angular/core';
import {LoadingController, ModalController, NavParams} from '@ionic/angular';
import {ReservoirService} from '../../../providers/reservoir.service';
import {DataProviderService} from '../../../providers/dataProvider.service';
import {FuelService} from '../../../providers/fuel.service';

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

    constructor(public navParams: NavParams, public modalCtrl: ModalController, public rsvorSvrc: ReservoirService,
                public loadCtrl: LoadingController, public fuelSvrc: FuelService) {
        // recuperation du type de carburant passé en paramettre
        this.reservoir = navParams.get('reservoirItem');
        // On indique si il s'agit de la mise a jour ou de la creation d'un utilisateur
        if (navParams.get('func') === 'update') {
            this.isCreate = false;
        }
    }

    submitRequest() {
        if (!DataProviderService.validateString(this.reservoir.libelle) || this.reservoir.volumeReservoir === null
            || this.reservoir.volumeReservoir < 0 || this.reservoir.typeCarburant === null) {
            this.rsvorSvrc.alertMsg('Remplissez entierement le formulaire', 2000, 'top', 'danger');
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

        this.rsvorSvrc.createReservoir(this.reservoir).subscribe(response => {
            if (response) {
                this.loadCtrl.dismiss();
                this.reservoir = response;
                this.modalCtrl.dismiss(this.reservoir);
            }
        }, error1 => {
            this.rsvorSvrc.alertMsg(error1.message, 3500, 'top', 'danger');
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

        this.rsvorSvrc.updateReservoir(this.reservoir).subscribe(response => {
            this.loadCtrl.dismiss();
            this.modalCtrl.dismiss(this.reservoir);
        }, error1 => {
            this.rsvorSvrc.alertMsg(error1.message, 3500, 'top', 'danger');
            this.loadCtrl.dismiss();
        });
    }

    getTypeFuel() {
        this.fuelSvrc.getAllFuelTypes().subscribe(response =>  {
            this.listFuelType = response;
        });
    }

}
