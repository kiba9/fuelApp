import {Component, OnInit} from '@angular/core';
import {ModalController, ToastController} from '@ionic/angular';
import {IndexaddPage} from '../indexadd/indexadd.page';
import {IndexCarburant} from '../../../models/indexCarburant';
import {IndexCarburantService} from '../../../providers/indexCarburantService';

@Component({
    selector: 'app-pompes',
    templateUrl: './pompes.page.html',
    styleUrls: ['./pompes.page.scss'],
})
export class PompesPage implements OnInit {

    segmentModel = 'SRXZ00';
    dataList = [];
    listePompes = [];
    isDelete = false;
    index: IndexCarburant = new IndexCarburant();

    constructor(public modalCtrl: ModalController, public toastCtrl: ToastController, public indxSvrc: IndexCarburantService) {
    }

    ngOnInit() {
        this.getIndexList();
        this.getListPompes();
    }

    segmentChanged() {
        // this.getData();
        this.getIndexList();
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
        for (let i = 0; i < 4; i++) {
            const item: any = {
                libelle: 'pompe ' + this.listePompes.length,
                code: 'SRXZ0' + this.listePompes.length
            };
            this.listePompes.push(item);
        }
        // this.getData();
    }

    getIndexList() {
        this.dataList = [];
        this.indxSvrc.getAllIndexCarburant().subscribe(value => {
            console.log(value);
            this.dataList = value;
            this.indxSvrc = value;
        }, async error1 => {
            console.log(error1);
            this.dataList = [];
            this.indxSvrc.alertMsg(error1.message, 4000, 'middle', 'warning');
        });
    }

    async getData(): Promise<void> {
        this.dataList = [];
        setTimeout(() => {
            const cpt = (this.segmentModel === this.listePompes[0].code) ? 3 : (this.segmentModel === this.listePompes[1].code) ? 5 : 10;
            for (let i = 0; i < cpt; i++) {
                const item: any = {
                    description: 'Item number ',
                    numero: this.dataList.length,
                    volumeVendu: 48460,
                    ancienIndex: 34527,
                };
                this.dataList.push(item);
            }
        }, 2000);
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
                attachElmnt: 'pompe',
                func: 'create'
            }
        });

        modal.onDidDismiss().then((response) => {
            if (response.data) {
                this.getData();
                this.indxSvrc.alertMsg('Index crée avec succeès', 2000, 'top', 'success');
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
                    this.indxSvrc.deleteIndexCarburant(indxPmp.idIndex).subscribe(value => {
                        this.indxSvrc.alertMsg('Utilisateur Supprimé avec succès', 2000, 'top', 'success');
                    }, error1 => {
                        this.indxSvrc.alertMsg(error1.message, 4000, 'bottom', 'danger');
                    });
                }
            });
        });
    }

}
