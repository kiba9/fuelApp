import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AlertController, LoadingController, ModalController} from '@ionic/angular';
import {DataProviderService} from '../../../providers/dataProvider.service';
import {PompeService} from '../../../providers/pompe.service';
import {Pompe} from '../../../models/pompe';
import {ReservoiraddPage} from '../reservoiradd/reservoiradd.page';
import {Reservoir} from '../../../models/reservoir';
import {FournisseurPage} from '../../menu/fournisseur/fournisseur.page';

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
    listePompes = [];
    listeReservoirs = [];

    constructor(public router: Router, public alertCtrl: AlertController, public pompeSvrc: PompeService,
                public loadCtrl: LoadingController, public modalCtrl: ModalController) {
        this.fabButtonOpened = false;
        if (router.getCurrentNavigation().extras.state) {
            this.station = this.router.getCurrentNavigation().extras.state.item;
        }
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
                            this.pompeSvrc.alertMsg('Remplissez tous les champs', 2000, 'top', 'danger');
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
            this.pompeSvrc.alertMsg('Veuilez ajouter au moins un reservoir a votre station', 2000, 'top', 'danger');
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

        this.pompeSvrc.createPompe(pmp).subscribe(response => {
            if (response) {
                this.loadCtrl.dismiss();
                this.listePompes.push(response);
                this.pompeSvrc.alertMsg('Pompes ajoutée', 2000, 'top', 'success');
            }
        }, error1 => {
            this.pompeSvrc.alertMsg(error1.message, 3500, 'top', 'danger');
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
                reservoirItem: this.reservoir,
                func: 'create'
            }
        });

        modal.onDidDismiss().then((response) => {
            if (response.data) {
                this.listeReservoirs.push(response.data);
                this.pompeSvrc.alertMsg('Reservoir crée avec succeès', 2000, 'top', 'success');
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
                this.pompeSvrc.alertMsg('Fournisseur atrribué avec succeès', 2000, 'top', 'success');
            }
        });

        return await modal.present();
    }


    openPage(page: string) {
        this.router.navigate([page]);
    }
}
