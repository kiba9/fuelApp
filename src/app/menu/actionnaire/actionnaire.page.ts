import {Component, OnInit} from '@angular/core';
import {Utilisateur} from '../../../models/Utilisateur';
import {DataProviderService} from '../../../providers/dataProvider.service';
import {HTTP} from '@ionic-native/http/ngx';
import {AlertController, LoadingController, ModalController, NavController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {UseraddPage} from '../../user/useradd/useradd.page';
import {Station} from '../../../models/station';

@Component({
    selector: 'app-actionnaire',
    templateUrl: './actionnaire.page.html',
    styleUrls: ['./actionnaire.page.scss'],
})
export class ActionnairePage implements OnInit {


    userlist = [];
    userfilterList: any[];
    isDelete = false;
    loaderToShow: any;

    station: Station;
    searchbar;
    isAdd = false;

    constructor(private router: Router, public nativeHttp: HTTP, private modalCtrl: ModalController, public loadCtrl: LoadingController,
                private toastCtrl: ToastController, public alertCtrl: AlertController, public navCtrl: NavController) {
        this.nativeHttp.setDataSerializer('json');
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
        this.getUserList();
    }

    /**
     * @description recupere la liste des actionnaire en base de données
     */
    getUserList() {
        this.userlist = this.userfilterList = null;
        this.nativeHttp.get(DataProviderService.getAllUser, {}, {}).then((response) => {
            response.data = JSON.parse(response.data);
            this.userlist = this.userfilterList = response.data;
        }).catch((error1) => {
            this.userlist = this.userfilterList = [];
            this.alertMsg(error1.error, 4000, 'middle', 'warning');
        });
    }

    /**
     * @description permet d'effectuer une recherche en fonction de ce que l'utilisateur entre sur la barre de recherche
     * @param event permet de recuperer la valeur de la barre de recherche
     */
    filterList(event) {
        this.userfilterList = this.userlist;
        const searchTerm = event.target.value;

        if (!searchTerm) {
            return;
        }

        // On fait un trie en fonction des nom ou des prenom commençant par la lettre saisie
        this.userfilterList = this.userfilterList.filter(utilisateur => {
            if (utilisateur.nom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
                return true;
            } else if (utilisateur.prenom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
                return true;
            }
        });
    }

    /**
     * @description permet de supprimer un utilisateur de la base de donnée avec possibilité d'annuler sous 5 sec
     * @param usr utilisateur a supprimer
     */
    async removeInvestor(usr) {
        // on retire l'utilidateur de la liste et on indique au systeme que l'on veut faire une suppréssion
        const index: number = this.station.listeUtilisateurs.indexOf(usr);

        const dialog = await this.alertCtrl.create({
            header: 'Retirer Actionnaire',
            subHeader: 'Confirmer votre action',
            message: `Êtez-vous certains de vouloir retirer ${usr.nom} ${usr.prenom} comme actionnaire sur cette station ?`,
            buttons: [
                {
                    text: 'Non',
                    role: 'cancel',
                    cssClass: 'dark'
                },
                {
                    text: 'Oui',
                    cssClass: 'danger',
                    handler: (val) => {
                        this.isDelete = true;
                    }
                }
            ]
        }).then((response) => {
            response.present();
            // une fois le delai de 5 sec passé, si la demande de suppression est effective on supprime alors en BD
            response.onWillDismiss().then(() => {
                this.station.listeUtilisateurs.splice(index, 1);
                if (this.isDelete && !usr.nowAdded) {
                    usr.station = null;
                    this.nativeHttp.put(DataProviderService.updateUser, usr, {}).then(() => {
                        this.alertMsg('Actionnaire retiré avec succès', 2000, 'top', 'success');
                    }).catch((error1) => {
                        this.alertMsg(error1.message, 4000, 'bottom', 'danger');
                    });
                }
            });
        });
    }

    async saveActionnaire() {
        this.loaderToShow = await this.loadCtrl.create({
            message: 'Patientez...',
            spinner: 'crescent'
        });
        await this.loaderToShow.present();

        this.nativeHttp.post(DataProviderService.setActionnaires + this.station.idStation + '/', this.station.listeUtilisateurs, {}).then(() => {
            this.loadCtrl.dismiss();
            this.alertMsg('liste des actionnaires enregistré avec succès', 2000, 'top', 'success');
        }).catch((error1) => {
            this.loadCtrl.dismiss();
            this.alertMsg(error1.message, 4000, 'bottom', 'danger');
        });
    }

    isAlsoAdd(item) {
        for (let it of this.station.listeUtilisateurs) {
            if (item.idUtilisateur == it.idUtilisateur) {
                return true;
            }
        }
    }

    seletedUser(item: any) {
        setTimeout(() => {
            item.nowAdded = true;
            this.station.listeUtilisateurs.push(item);
            this.searchbar = '';
            this.isAdd = true;
        }, 10);

    }

    async closeWindow() {
        const dialog = await this.alertCtrl.create({
            header: 'Attention',
            subHeader: 'Confirmer votre action',
            message: `Toutes les modifications effectuées ne seront pas enregistées`,
            buttons: [
                {
                    text: 'Non',
                    role: 'cancel',
                    cssClass: 'dark'
                },
                {
                    text: 'Oui',
                    cssClass: 'danger',
                    handler: (val) => {
                        this.navCtrl.pop();
                        this.router.dispose();
                    }
                }
            ]
        });

        if (this.isAdd) {
            await dialog.present();
        } else {
            this.navCtrl.pop();
            this.router.dispose();
        }
    }
}
