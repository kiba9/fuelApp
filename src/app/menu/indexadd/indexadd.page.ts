import {Component, OnInit} from '@angular/core';
import {LoadingController, ModalController, NavParams, ToastController} from '@ionic/angular';
import {DataProviderService} from '../../../providers/dataProvider.service';
import {HTTP} from '@ionic-native/http/ngx';
import {Vendor} from '../../../models/vendor';

@Component({
    selector: 'app-indexadd',
    templateUrl: './indexadd.page.html',
    styleUrls: ['./indexadd.page.scss'],
})
export class IndexaddPage implements OnInit {

    indexC;
    pompe;
    reservoir;
    idStation;
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
                public toastCtrl: ToastController,  public nativeHttp: HTTP) {
        this.nativeHttp.setDataSerializer('json');
        // recuperation du type de carburant passé en paramettre
        this.indexC = navParams.get('indexItem');
        this.idStation = navParams.get('idStation');
        // On indique si il s'agit de la mise a jour ou de la creation d'un utilisateur
        if (navParams.get('func') === 'update') {
            this.isCreate = false;
            this.pompe = this.indexC.pompe;
        }
        if (navParams.get('attachElmnt') === 'pompe') {
            this.isPompe = true;
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

    compareFn(e1, e2): boolean {
        return e1 && e2 ? e1.idPompe == e2.idPompe : e1 == e2;
    }

    compareFn2(e1, e2): boolean {
        return e1 && e2 ? e1.idReservoir == e2.idReservoir : e1 == e2;
    }

    ngOnInit() {
        this.getListPompes();
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
            this.alertMsg('Remplissez entierement le formulaire', 2000, 'top', 'danger');
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

        this.nativeHttp.post(DataProviderService.createIndexCarburant, this.indexC, {}).then((response) => {
            response.data = JSON.parse(response.data);
            if(response.data){
                this.loadCtrl.dismiss();
                this.indexC = response.data;
                this.modalCtrl.dismiss(this.indexC);
            }
        }).catch((error1) => {
            this.alertMsg(error1.error, 3500, 'top', 'danger');
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

        this.nativeHttp.put(DataProviderService.updateIndexCarburant, this.indexC, {}).then(() => {
            this.loadCtrl.dismiss();
            this.modalCtrl.dismiss(this.indexC);
        }).catch((error1) => {
            this.alertMsg(error1.message, 3500, 'top', 'danger');
            this.loadCtrl.dismiss();
        });
    }

    getListPompes() {
        this.nativeHttp.get(DataProviderService.getPompesOfStation + this.idStation, {}, {}).then((response) => {
            response.data = JSON.parse(response.data);
            console.log(response.data);
            this.listPompeStation = response.data;
        }).catch((error1) => {
            this.listPompeStation = [];
            this.alertMsg(error1.error, 4000, 'middle', 'warning');
        });
    }

}
