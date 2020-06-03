import {Component, OnInit} from '@angular/core';
import {LoadingController, ModalController, NavParams, ToastController} from '@ionic/angular';
import {UserService} from '../../../providers/user.service';
import {DataProviderService} from '../../../providers/dataProvider.service';
import {HTTP} from '@ionic-native/http/ngx';

@Component({
    selector: 'app-useradd2',
    templateUrl: './useradd2.page.html',
    styleUrls: ['./useradd2.page.scss'],
})
export class Useradd2Page implements OnInit {

    utilisateur;
    isCreate = true;
    password;
    passwordConfirm;
    loaderToShow: any;
    isAdmin = true;

    constructor(public navParams: NavParams, public modalCtrl: ModalController, public nativeHttp: HTTP,
                public loadCtrl: LoadingController, public toastCtrl: ToastController) {
        this.nativeHttp.setDataSerializer('json');
        // recuperation de l'utilisateur passé en paramettre
        this.utilisateur = navParams.get('user');
        // On indique si il s'agit de la mise a jour ou de la creation d'un utilisateur
        if (navParams.get('func') === 'update') {
            this.isCreate = false;
            this.password = this.passwordConfirm = this.utilisateur.password;
        }
    }

    ngOnInit() {
    }

    async closeModal() {
        await this.modalCtrl.dismiss();
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
     *  @description permet de verfier si les champs necessaire pour créer un utilisateur sont bien remplis puis
     *  apple la methode adéquate soit creer / update
     */
    submitRequest() {
        if (!DataProviderService.validateString(this.utilisateur.username)
            || !DataProviderService.validateString(this.password) || !DataProviderService.validateString(this.passwordConfirm)
            || !DataProviderService.validateString(this.utilisateur.statutUtilisateur) || this.utilisateur.partAction === null
            || this.utilisateur.partAction < 0) {
            console.log(this.utilisateur);
            this.alertMsg('Remplissez entierement le formulaire', 2000, 'top', 'danger');
        } else {
            if (this.password !== this.passwordConfirm) {
                this.alertMsg('Pass de correspondance entre les mots de passe', 2000, 'top', 'danger');
            } else {
                this.utilisateur.roles = this.isAdmin ? 'ADMIN' : 'USER';
                this.utilisateur.password = this.passwordConfirm;
                if (this.isCreate) {
                    this.createUser();
                } else {
                    this.updateUser();
                }
            }
        }
    }

    /**
     * @description methode permettant d'ajouter un nouvel utilisateur en base de données
     */
    async createUser() {
        this.loaderToShow = await this.loadCtrl.create({
            message: 'Patientez...',
            spinner: 'crescent'
        });
        await this.loaderToShow.present();

        this.nativeHttp.post(DataProviderService.createUser, this.utilisateur, {}).then((response) => {
            response.data = JSON.parse(response.data);
            if(response.data){
                this.loadCtrl.dismiss();
                this.utilisateur = response.data;
                this.modalCtrl.dismiss(this.utilisateur);
            }
        }).catch((error1) => {
            this.alertMsg(error1.message, 3500, 'top', 'danger');
            this.loadCtrl.dismiss();
        });
    }

    /**
     * @description methode permettant de modifier les information d'un utilisateur present en BD
     */
    async updateUser() {
        this.loaderToShow = await this.loadCtrl.create({
            message: 'Patientez...',
            spinner: 'crescent'
        });
        await this.loaderToShow.present();

        this.nativeHttp.put(DataProviderService.updateUser, this.utilisateur, {}).then((response) => {
            this.loadCtrl.dismiss();
            this.modalCtrl.dismiss(this.utilisateur);
        }).catch((error1) => {
            this.alertMsg(error1.message, 3500, 'top', 'danger');
            this.loadCtrl.dismiss();
        });
    }
}
