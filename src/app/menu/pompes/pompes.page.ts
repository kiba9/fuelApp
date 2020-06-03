import {Component, OnInit} from '@angular/core';
import {ModalController, PopoverController, ToastController} from '@ionic/angular';
import {IndexaddPage} from '../indexadd/indexadd.page';
import {IndexCarburant} from '../../../models/indexCarburant';
import {HTTP} from '@ionic-native/http/ngx';
import {DataProviderService} from '../../../providers/dataProvider.service';
import {Router} from '@angular/router';
import {SettingsComponent} from '../../components/settings/settings.component';

@Component({
    selector: 'app-pompes',
    templateUrl: './pompes.page.html',
    styleUrls: ['./pompes.page.scss'],
})
export class PompesPage implements OnInit {

    segmentModel;
    dataList = [];
    listePompes = [];
    isDelete = false;
    station;
    index: IndexCarburant = new IndexCarburant();

    constructor(public router: Router, public modalCtrl: ModalController, public toastCtrl: ToastController,
                public nativeHttp: HTTP, public popoverCtrl: PopoverController) {
        if (router.getCurrentNavigation().extras.state) {
            this.station = this.router.getCurrentNavigation().extras.state.item;
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

    ngOnInit() {
        this.getListPompes();
    }

    segmentChanged() {
        this.getIndexList(this.getCurrentSegment());
    }

    doRefresh(event) {
        console.log('Begin async operation');

        setTimeout(() => {
            console.log('Async operation has ended');
            event.target.complete();
        }, 2000);
    }

    /**
     * recupere la liste des pompes de cette station en BD
     */
    getListPompes() {
        this.nativeHttp.get(DataProviderService.getPompesOfStation + this.station.idStation, {}, {}).then((response) => {
            response.data = JSON.parse(response.data);
            console.log(response.data);
            this.listePompes = response.data;
            this.segmentModel = response.data[0].code;
            this.getIndexList(this.getCurrentSegment());
        }).catch((error1) => {
            this.listePompes = [];
            if(error1.error) this.alertMsg(error1.error, 3500, 'middle', 'warning');
            else this.alertMsg('Erreur Serveur: Impossible de recuperer les données.', 3500, 'top', 'warning');
        });
    }

    getIndexList(idPmp) {
        this.dataList = null;
        this.nativeHttp.get(DataProviderService.getIndexOfPompe + idPmp, {}, {}).then((response) => {
            response.data = JSON.parse(response.data);
            this.dataList = response.data;
        }).catch((error1) => {
            this.dataList = [];
            this.alertMsg(error1.error, 4000, 'middle', 'warning');
        });
    }

    /**
     * @description permet de creer un index carburant en base de donnée
     */
    async createIndexCarburant() {
        const modal = await this.modalCtrl.create({
            animated: true,
            component: IndexaddPage,
            componentProps: {
                indexItem: new IndexCarburant(),
                idStation: this.station.idStation,
                attachElmnt: 'pompe',
                func: 'create'
            }
        });

        modal.onDidDismiss().then((response) => {
            if (response.data) {
                this.getIndexList(this.getCurrentSegment());
                this.alertMsg('Index crée avec succeès', 2000, 'top', 'success');
            }
        });

        await modal.present();
    }

    async deleteIndexCarburant(itemCarb: any) {
        const modal = await this.modalCtrl.create({
            animated: true,
            component: IndexaddPage,
            componentProps: {
                indexItem: itemCarb,
                idStation: this.station.idStation,
                attachElmnt: 'pompe',
                func: 'update'
            }
        });

        modal.onDidDismiss().then((response) => {
            if (response.data) {
                this.getIndexList(this.getCurrentSegment());
                this.alertMsg('Index modifié avec succeès', 2000, 'top', 'success');
            }
        });

        await modal.present();
    }


    /**
     * @description permet de supprimer un index de la base de donnée avec possibilité d'annuler sous 5 sec
     * @param indxPmp utilisateur a supprimer
     */
    async deleteIndexPompe(indxPmp) {
        // on retire l'utilidateur de la liste et on indique au systeme que l'on veut faire une suppréssion
        const index: number = this.dataList.indexOf(indxPmp);
        this.dataList.splice(index, 1);
        this.isDelete = true;

        // on affiche un toast pendant 5 sec permettant d'annuler l'action une fois le delai passé la suppresion sera définitive
        const toast = await this.toastCtrl.create({
            message: `Suppression de ${indxPmp.numero}...`,
            color: 'tertiary',
            duration: 5000,
            buttons: [
                // boutton permettant d'annuler la suppression
                {
                    text: 'Annuler',
                    role: 'cancel',
                    handler: () => {
                        // on indique au systeme que l'on ne veut plus faire de suppression et on remet l'utilisateur a sa position
                        this.isDelete = false;
                        this.dataList.splice(index, 0, indxPmp);
                    }
                }
            ]
        }).then((response) => {
            response.present();
            // une fois le delai de 5 sec passé, si la demande de suppression est effective on supprime alors en BD
            response.onWillDismiss().then((res) => {
                if (this.isDelete) {
                    this.nativeHttp.delete(DataProviderService.deleteIndexCarburant + indxPmp.idIndex, {}, {}).then((response) => {
                        this.alertMsg('index Supprimé avec succès', 2000, 'top', 'success');
                    }).catch((error1) => {
                        this.alertMsg(error1.error, 4000, 'bottom', 'danger');
                    });
                }
            });
        });
    }

    getCurrentSegment() : number {
        for(let itPmp of this.listePompes){
            if(this.segmentModel === itPmp.code){
                return itPmp.idPompe;
            }
        }
    }

}
