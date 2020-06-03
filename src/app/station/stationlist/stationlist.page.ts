import {Component, OnInit} from '@angular/core';
import {Station} from '../../../models/station';
import {ModalController, PopoverController, ToastController} from '@ionic/angular';
import {StationService} from '../../../providers/station.service';
import {SettingsComponent} from '../../components/settings/settings.component';
import {StationaddPage} from '../stationadd/stationadd.page';
import {Router} from '@angular/router';
import {DataProviderService} from '../../../providers/dataProvider.service';
import {HTTP} from '@ionic-native/http/ngx';

@Component({
    selector: 'app-stationlist',
    templateUrl: './stationlist.page.html',
    styleUrls: ['./stationlist.page.scss'],
})
export class StationlistPage implements OnInit {

    stationList = [];
    stationFilterList = [];
    isDelete = false;
    station: Station = new Station();
    stationCss = ['stion_colr1', 'stion_colr2', 'stion_colr3'];

    constructor(public modalCtrl: ModalController, public toastCtrl: ToastController, public nativeHttp: HTTP,
                public popoverCtrl: PopoverController, public router: Router) {
    }

    ngOnInit() {
        this.getStations();
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


    /**
     * @description recuperer la liste des stations en base de donnée
     */
    getStations() {
        this.stationList = null;
        this.nativeHttp.get(DataProviderService.getAllStation, {}, {}).then((response) => {
          console.log(response);
            response.data = JSON.parse(response.data);
            this.stationList = this.stationFilterList = response.data;
        }).catch((error1) => {
            this.stationList = [];
            this.alertMsg(error1.error, 4000, 'middle', 'warning');
        });
    }

    /**
     * @description permet de creer une station dans notre base de données
     */
    async createStation() {

        const modal = await this.modalCtrl.create({
            animated: true,
            component: StationaddPage,
            componentProps: {
                stationItem: new Station(),
                func: 'create'
            }
        });

        modal.onDidDismiss().then((response) => {
            if (response.data) {
                this.stationList.push(response.data);
                this.alertMsg('Station crée avec succeès', 2000, 'top', 'success');
            }
        });

        return await modal.present();
    }

    /**
     * @description permet de supprimer une station de la base de donnée avec possibilité d'annuler sous 5 sec
     * @param itemStation station a supprimer
     */
    async deleteStation(itemStation) {
        // on retire la station de la liste et on indique au systeme que l'on veut faire une suppréssion
        const index: number = this.stationList.indexOf(itemStation);
        this.stationList.splice(index, 1);
        this.isDelete = true;

        // on affiche un toast pendant 5 sec permettant d'annuler l'action une fois le delai passé la suppresion sera définitive
        const toast = await this.toastCtrl.create({
            message: `Suppression de ${itemStation.nom}...`,
            color: 'tertiary',
            duration: 5000,
            buttons: [
                // boutton permettant d'annuler la suppression
                {
                    text: 'Annuler',
                    role: 'cancel',
                    handler: () => {
                        // on indique au systeme que l'on ne veut plus faire de suppression et on remet le type carburant a sa position
                        this.isDelete = false;
                        this.stationList.splice(index, 0, itemStation);
                    }
                }
            ]
        }).then((response) => {
            response.present();
            // une fois le delai de 5 sec passé, si la demande de suppression est effective on supprime alors en BD
            response.onWillDismiss().then((res) => {
                if (this.isDelete) {
                    this.nativeHttp.delete(DataProviderService.deleteStation + itemStation.idStation + '/', {}, {}).then((response) => {
                        this.alertMsg('Station Supprimé avec succès', 2000, 'top', 'success');
                    }).catch((error1) => {
                        this.alertMsg(error1.error, 4000, 'bottom', 'danger');
                        this.isDelete = false;
                        this.stationList.splice(index, 0, itemStation);
                    });
                }
            });
        });
    }

    /**
     * @description cette fonction ouvre un modal en mode modification pour changer les information d'une station
     * @param itemStion utilisateur a modifier
     */
    async updateStation(itemStion) {
        const modal = await this.modalCtrl.create({
            animated: true,
            component: StationaddPage,
            componentProps: {
                stationItem: itemStion,
                func: 'update'
            }
        });

        modal.onDidDismiss().then((response) => {
            if (response.data) {
                const pos: number = this.stationList.indexOf(itemStion);
                this.stationList.splice(pos, 1);
                this.stationList.splice(pos, 0, response.data);
                this.alertMsg('station Modifié avec succeès', 2000, 'top', 'success');
            }
        });

        await modal.present();
    }

    /**
     * permet d'afficher le menu contextuel et choisir une option
     * @param ev evenemet
     * @param itemSt l'objet a supprimer
     */
    async doOperation(ev: MouseEvent, itemSt) {
        ev.stopPropagation();
        // on affiche le menu contextuel
        const popover = await this.popoverCtrl.create({
            component: SettingsComponent,
            event: ev,
        });

        // lorsque celui ci est sur le ppoint de disparaitre il reccupere la valeur de l'option choisi et applle  la fonction adequate
        popover.onDidDismiss().then((response) => {
            if (response.data === 'update') {
                this.updateStation(itemSt);
                console.log(response.data);
            } else if (response.data === 'delete') {
                this.deleteStation(itemSt);
            }
        });

        return await popover.present();
    }

    /**
     * afficher les detail sur une station
     * @param itm objet a afficher
     */
    showDetail(itm) {
        this.router.navigate(['station/menu'], DataProviderService.setExtras(itm));
    }

    filterList(event) {
        this.stationFilterList = this.stationList;
        const searchTerm = event.target.value;

        if (!searchTerm) {
            return;
        }

        // On fait un trie en fonction des nom ou des prenom commençant par la lettre saisie
        this.stationFilterList = this.stationFilterList.filter(statn => {
            if (statn.nom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
                return true;
            }
        });

        console.log(this.stationFilterList);
    }

}
