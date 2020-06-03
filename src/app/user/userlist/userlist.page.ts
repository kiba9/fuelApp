import {Component, OnInit} from '@angular/core';
import {ModalController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {UserService} from '../../../providers/user.service';
import {UseraddPage} from '../useradd/useradd.page';
import {Utilisateur} from '../../../models/Utilisateur';
import {HTTP} from '@ionic-native/http/ngx';
import {DataProviderService} from '../../../providers/dataProvider.service';

@Component({
    selector: 'app-userlist',
    templateUrl: './userlist.page.html',
    styleUrls: ['./userlist.page.scss'],
})
export class UserlistPage implements OnInit {

    userlist = [];
    userfilterList: any[];
    isDelete = false;
    utilisateur: Utilisateur = new Utilisateur();

    constructor(private router: Router, public nativeHttp: HTTP, private modalCtrl: ModalController,
                private toastCtrl: ToastController) {
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
     * @description permet de creer un utilisateur en base de donnée
     */
    async createUser() {
        const modal = await this.modalCtrl.create({
            animated: true,
            component: UseraddPage,
            componentProps: {
                user: new Utilisateur(),
                func: 'create'
            }
        });

        modal.onDidDismiss().then((response) => {
            if (response.data) {
                this.userlist.push(response.data);
                this.alertMsg('Utilisateur crée avec succeès', 2000, 'top', 'success');
            }
        });

        await modal.present();
    }

    /**
     * @description permet de supprimer un utilisateur de la base de donnée avec possibilité d'annuler sous 5 sec
     * @param usr utilisateur a supprimer
     */
    async deleteUser(usr) {
        // on retire l'utilidateur de la liste et on indique au systeme que l'on veut faire une suppréssion
        const index: number = this.userlist.indexOf(usr);
        this.userlist.splice(index, 1);
        this.isDelete = true;

        // on affiche un toast pendant 5 sec permettant d'annuler l'action une fois le delai passé la suppresion sera définitive
        const toast = await this.toastCtrl.create({
            message: `Suppression de ${usr.nom}...`,
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
                        this.userlist.splice(index, 0, usr);
                    }
                }
            ]
        }).then((response) => {
            response.present();
            // une fois le delai de 5 sec passé, si la demande de suppression est effective on supprime alors en BD
            response.onWillDismiss().then((res) => {
                if (this.isDelete) {
                    this.nativeHttp.delete(DataProviderService.deleteUser + usr.idUtilisateur + '/', {}, {}).then((response) => {
                        this.alertMsg('Utilisateur Supprimé avec succès', 2000, 'top', 'success');
                    }).catch((error1) => {
                        this.alertMsg(error1.message, 4000, 'bottom', 'danger');
                    });
                }
            });
        });
    }

    /**
     * @description cette fonction ouvre un modal en mode modification pour changer les information d'un utilisateur
     * @param usr utilisateur a modifier
     */
    async updateUser(usr) {
        const modal = await this.modalCtrl.create({
            animated: true,
            component: UseraddPage,
            componentProps: {
                user: usr,
                func: 'update'
            }
        });

        modal.onDidDismiss().then((response) => {
            if (response.data) {
                const pos: number = this.userlist.indexOf(usr);
                this.userlist.splice(pos, 1);
                this.userlist.splice(pos, 0, response.data);
                this.alertMsg('Utilisateur Modifié avec succeès', 2000, 'top', 'success');
            }
        });

        await modal.present();
    }
}
