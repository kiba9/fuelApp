import {Component, OnInit} from '@angular/core';
import {LoadingController, ModalController, NavParams} from '@ionic/angular';
import {IndexCarburantService} from '../../../providers/indexCarburantService';
import {DataProviderService} from '../../../providers/dataProvider.service';

@Component({
    selector: 'app-indexadd',
    templateUrl: './indexadd.page.html',
    styleUrls: ['./indexadd.page.scss'],
})
export class IndexaddPage implements OnInit {

    indexC;
    pompe;
    reservoir;
    listPompeStation = [];
    listReservoirStation = [];
    isCreate = true;
    isPompe = false;
    loaderToShow: any;

    customAlertOptions: any = {
        header: 'Element',
        subHeader: 'Pompe | Reservoir',
        message: 'Selectionnez l\'element d`\'attache de cette index Carburant',
        translucent: true
    };

    constructor(public navParams: NavParams, public modalCtrl: ModalController, public loadCtrl: LoadingController,
                public indxService: IndexCarburantService) {
        // recuperation du type de carburant passé en paramettre
        this.indexC = navParams.get('indexItem');
        // On indique si il s'agit de la mise a jour ou de la creation d'un utilisateur
        if (navParams.get('func') === 'update') {
            this.isCreate = false;
        }
        if (navParams.get('attachElmnt') === 'pompe') {
            this.isPompe = true;
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
        if ((this.reservoir && this.pompe) || !DataProviderService.validateString(this.indexC.description)
            || this.indexC.volumeVendu === null || this.indexC.volumeVendu < 0 || this.indexC.numero === null || this.indexC.numero < 0) {
            this.indxService.alertMsg('Remplissez entierement le formulaire', 2000, 'top', 'danger');
        } else {
            this.indexC.reservoir = this.reservoir;
            console.log(this.indexC);
            this.indexC.pompe = this.pompe;
            if (this.isCreate) {
                this.createIndexCarb();
            } else {
                this.updateIndexCarb();
            }
        }
    }

    /**
     * @description recupere la liste des pompes et celle des reservoir
     */
    getPompeEtReservoir() {
    }

    /**
     * @description methode permettant d'ajouter un nouveau fournisseur en base de données
     */
    async createIndexCarb() {
        this.loaderToShow = await this.loadCtrl.create({
            message: 'Patientez...',
            spinner: 'crescent'
        });
        await this.loaderToShow.present();

        this.indxService.createIndexCarburant(this.indexC).subscribe(response => {
            if (response) {
                this.loadCtrl.dismiss();
                this.indexC = response;
                this.modalCtrl.dismiss(this.indexC);
            }
        }, error1 => {
            this.indxService.alertMsg(error1.message, 3500, 'top', 'danger');
            this.loadCtrl.dismiss();
        });
    }

    /**
     * @description methode permettant de modifier les information d'un fournisseur present en BD
     */
    async updateIndexCarb() {
        this.loaderToShow = await this.loadCtrl.create({
            message: 'Patientez...',
            spinner: 'crescent'
        });
        await this.loaderToShow.present();

        this.indxService.updateIndexCarburant(this.indexC).subscribe(response => {
            this.loadCtrl.dismiss();
            this.modalCtrl.dismiss(this.indexC);
        }, error1 => {
            this.indxService.alertMsg(error1.message, 3500, 'top', 'danger');
            this.loadCtrl.dismiss();
        });
    }

}
