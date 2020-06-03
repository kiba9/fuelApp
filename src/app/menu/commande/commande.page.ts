import {Component, OnInit} from '@angular/core';
import {DataProviderService} from '../../../providers/dataProvider.service';
import {ModalController, ToastController} from '@ionic/angular';
import {HTTP} from '@ionic-native/http/ngx';
import {Router} from '@angular/router';
import {UseraddPage} from '../../user/useradd/useradd.page';
import {Utilisateur} from '../../../models/Utilisateur';
import {Commande} from '../../../models/commande';
import {CmdeaddPage} from '../cmdeadd/cmdeadd.page';

@Component({
    selector: 'app-commande',
    templateUrl: './commande.page.html',
    styleUrls: ['./commande.page.scss'],
})
export class CommandePage implements OnInit {

    segmentModel = 'enregistrer';
    dataList = [];
    isDelete = false;
    station;

    constructor(public router: Router, public toastCtrl: ToastController,  public nativeHttp: HTTP, private modalCtrl: ModalController) {
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
       // this.getData();
        this.getCommandes();
    }

    segmentChanged() {
        // this.getData();
        this.getCommandes();
    }

    doRefresh(event) {
        console.log('Begin async operation');

        setTimeout(() => {
            console.log('Async operation has ended');
            event.target.complete();
        }, 2000);
    }

    async getData(): Promise<void> {
        this.dataList = [];
        setTimeout(() => {
            const cpt = (this.segmentModel === 'enAttente') ? 3 : (this.segmentModel === 'enCours') ? 7 : 10;
            for (let i = 0; i < cpt; i++) {
                const item: any = {
                    libelle: 'Item number ' + this.dataList.length,
                    typeCarburant: 'essence',
                    fournisseur: 'topOil',
                    volumeCommande: 100000,
                    volumeLivre: 70000,
                    dateCommande: '10/02/2020',
                    dateLivraison: '15/02/2020'
                };
                this.dataList.push(item);
            }
        }, 2000);
    }

    getCommandes(){
        this.dataList = null;
        this.nativeHttp.get(DataProviderService.getAllCommande, {}, {}).then((response) => {
            response.data = JSON.parse(response.data);
            this.dataList = response.data;
            this.dataList = this.dataList.filter(value => {
                if(value.statut == this.segmentModel){
                    return true;
                }
            })
            //this.filterCommandeState();
        }).catch((error1) => {
            this.dataList = [];
            this.alertMsg(error1.error, 4000, 'middle', 'warning');
        });
    }

    filterCommandeState(){
        for(let cmd of this.dataList){
            if(cmd.statut != this.segmentModel){
                const pos: number = this.dataList.indexOf(cmd);
                this.dataList.splice(pos, 1);
            }
        }
    }

    async deleteCmde(cmde) {
        // on retire l'utilidateur de la liste et on indique au systeme que l'on veut faire une suppréssion
        const index: number = this.dataList.indexOf(cmde);
        this.dataList.splice(index, 1);
        this.isDelete = true;

        // on affiche un toast pendant 5 sec permettant d'annuler l'action une fois le delai passé la suppresion sera définitive
        const toast = await this.toastCtrl.create({
            message: `Suppression de ${cmde.idCommande}...`,
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
                        this.dataList.splice(index, 0, cmde);
                    }
                }
            ]
        }).then((response) => {
            response.present();
            // une fois le delai de 5 sec passé, si la demande de suppression est effective on supprime alors en BD
            response.onWillDismiss().then((res) => {
                if (this.isDelete) {
                    this.nativeHttp.delete(DataProviderService.deleteCommade + cmde.idCommande + '/', {}, {}).then((response) => {
                        this.alertMsg('Commande Supprimé avec succès', 2000, 'top', 'success');
                    }).catch((error1) => {
                        this.alertMsg(error1.message, 4000, 'bottom', 'danger');
                    });
                }
            });
        });
    }

    async createCmde() {
        const modal = await this.modalCtrl.create({
            animated: true,
            component: CmdeaddPage,
            componentProps: {
                cmdItem: new Commande(),
                stationItem: this.station,
                func: 'create'
            }
        });

        modal.onDidDismiss().then((response) => {
            if (response.data) {
                this.alertMsg('Commande crée avec succeès', 2000, 'top', 'success');
                this.getCommandes();
            }
        });

        await modal.present();
    }


    async updateCmde(cmde) {
        const modal = await this.modalCtrl.create({
            animated: true,
            component: CmdeaddPage,
            componentProps: {
                cmde: cmde,
                func: 'update'
            }
        });

        modal.onDidDismiss().then((response) => {
            if (response.data) {
                const pos: number = this.dataList.indexOf(cmde);
                this.dataList.splice(pos, 1);
                this.dataList.splice(pos, 0, response.data);
                this.alertMsg('Commande Modifié avec succeès', 2000, 'top', 'success');
            }
        });

        await modal.present();
    }

}
