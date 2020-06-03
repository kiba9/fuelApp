import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AlertController, LoadingController, ModalController, ToastController} from '@ionic/angular';
import {DataProviderService} from '../../../providers/dataProvider.service';
import {Pompe} from '../../../models/pompe';
import {ReservoiraddPage} from '../reservoiradd/reservoiradd.page';
import {Reservoir} from '../../../models/reservoir';
import {FournisseurPage} from '../../menu/fournisseur/fournisseur.page';
import {HTTP} from '@ionic-native/http/ngx';
import {CmdeaddPage} from '../../menu/cmdeadd/cmdeadd.page';
import {Commande} from '../../../models/commande';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.page.html',
    styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

    station: any;
    pompe: Pompe = new Pompe();
    reservoir: Reservoir = new Reservoir();
    fabButtonOpened: boolean;
    loaderToShow: any;
    listeReservoirs = [];
    stationExtra;

    constructor(public router: Router, public alertCtrl: AlertController,  public nativeHttp: HTTP,
                public loadCtrl: LoadingController, public modalCtrl: ModalController, public toastCtrl: ToastController) {
        this.fabButtonOpened = false;
        if (router.getCurrentNavigation().extras.state) {
            this.station = this.router.getCurrentNavigation().extras.state.item;
            this.stationExtra = DataProviderService.setExtras(this.station);
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
    }

    /**
     * fonction qui permet d'ajouter une pompe a une station
     * @param pm objet a ajoiuter
     */
    async addPompe(pm?: any) {
        const alert = await this.alertCtrl.create({
            header: 'Nouvelle pompe',
            message: 'Ajouter une pompe a votre station',
            inputs: [
                {
                    name: 'code',
                    type: 'text',
                    label: 'code',
                    placeholder: 'code de la pompe',
                    value: pm.code
                },
                {
                    name: 'libelle',
                    type: 'text',
                    label: 'libelle',
                    placeholder: 'libelle de la pompe',
                    value: pm.libelle

                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'danger'
                },
                {
                    text: 'enregistrer',
                    cssClass: 'secondary',
                    handler: pomp => {
                        if (!DataProviderService.validateString(pomp.libelle) || !DataProviderService.validateString(pomp.code)) {
                            this.alertMsg('Remplissez tous les champs', 2000, 'top', 'danger');
                            this.addPompe(pomp);
                        } else {
                            pomp.stationservice = this.station;
                            this.createNewPompe(pomp);
                        }
                    }
                }
            ]
        });
        if (this.listeReservoirs.length >= 0) {
            await alert.present();
        } else {
            this.alertMsg('Veuilez ajouter au moins un reservoir a votre station', 2000, 'top', 'danger');
        }
    }

    /**
     * fonction qui permet de creer une nouvelle pompe en bd
     * @param pmp objet a enregistré
     */
    async createNewPompe(pmp) {
        this.loaderToShow = await this.loadCtrl.create({
            message: 'Patientez...',
            spinner: 'crescent'
        });
        await this.loaderToShow.present();
        this.nativeHttp.setDataSerializer('json');
        this.nativeHttp.post(DataProviderService.createPompe, pmp, {}).then((response) => {
            response.data = JSON.parse(response.data);
            if(response.data){
                this.loadCtrl.dismiss();
                // this.listePompes.push(response.data);
                this.alertMsg('Pompe ajoutée', 2000, 'top', 'success');
            }
        }, (error1) => {
            this.alertMsg(error1.error, 3500, 'top', 'danger');
            this.loadCtrl.dismiss();
            this.addPompe(pmp);
        });
    }

    /**
     * @description permet d'ajouter un type de carburant a notre base de données
     */
    async createReservoir() {

        const modal = await this.modalCtrl.create({
            animated: true,
            component: ReservoiraddPage,
            componentProps: {
                reservoirItem: new Reservoir(),
                func: 'create'
            }
        });

        modal.onDidDismiss().then((response) => {
            if (response.data) {
                this.listeReservoirs.push(response.data);
                this.alertMsg('Reservoir crée avec succeès', 2000, 'top', 'success');
            }
        });

        return await modal.present();
    }

    /**
     * fonction qui permet d'attribuer a une station un fournisseur unique
     */
    async setFournisseur() {
        const modal = await this.modalCtrl.create({
            animated: true,
            component: FournisseurPage,
            cssClass: 'mfournisseur',
            componentProps: {
                stationItem: this.station,
            }
        });

        modal.onDidDismiss().then((response) => {
            if (response.data) {
                this.station = response.data;
                this.alertMsg('Fournisseur atrribué avec succeès', 2000, 'top', 'success');
            }
        });

        return await modal.present();
    }

    /**
     * @description creation d'une nouvelle commande
     */
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
            }
        });

        await modal.present();
    }


    openPage(page: string, extras?) {
        this.router.navigate([page], extras);
    }
}
