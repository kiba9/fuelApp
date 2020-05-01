import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {UserService} from '../../../providers/user.service';
import {DataProviderService} from '../../../providers/dataProvider.service';
import {Useradd2Page} from '../useradd2/useradd2.page';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-useradd',
    templateUrl: './useradd.page.html',
    styleUrls: ['./useradd.page.scss'],
})
export class UseraddPage implements OnInit {

    utilisateur;
    countryList; // = require('../../../assets/pays.json'); // chargement de la liste des pays et nationalités

    constructor(public navParams: NavParams, public modalCtrl: ModalController, public userSrvc: UserService, public http: HttpClient) {
        this.utilisateur = navParams.get('user');
        this.http.get('assets/pays.json').subscribe( (res: any) => {
            this.countryList = res.pays;
        });
    }

    ngOnInit() {
    }

    /**
     * @description permet de verfier si les champs necessaire pour créer un utilisateur sont bien remplis et
     * redirige vers la suite du formulaire
     */
    async nextStep() {
        if (!DataProviderService.validateString(this.utilisateur.nom) || !DataProviderService.validateString(this.utilisateur.prenom)
            || !DataProviderService.validateString(this.utilisateur.nationalite)
            || !DataProviderService.validateString(this.utilisateur.pays)
            || !DataProviderService.validateString(this.utilisateur.adresse)) {
            this.userSrvc.alertMsg('Remplissez entierement le formulaire', 2000, 'top', 'danger');
        } else {
            const modal = await this.modalCtrl.create({
                animated: true,
                component: Useradd2Page,
                componentProps: {
                    user: this.utilisateur,
                    func: this.navParams.get('func')
                }
            });

            modal.onDidDismiss().then(async (response) => {
                if (response.data) {
                    this.utilisateur = response.data;
                    setTimeout(async () => {
                        await this.modalCtrl.dismiss(this.utilisateur);
                    }, 10);
                }
            });

            await modal.present();
        }
    }

    async closeModal() {
        await this.modalCtrl.dismiss();
    }
}
