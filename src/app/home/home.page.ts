import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../providers/user.service';
import {LoadingController} from '@ionic/angular';
import {DataProviderService} from '../../providers/dataProvider.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    loginUser: string;
    password: string;
    loaderToShow: any;

    constructor(private router: Router, private userSrvc: UserService, public loadCtrl: LoadingController) {
    }

    /**
     * @description permet de verifier si les champs rentrer sont vide ou pas et appelle la fonction connexion
     */
    submitRequest() {
        if (!DataProviderService.validateString(this.loginUser) || !DataProviderService.validateString(this.password)) {
            this.userSrvc.alertMsg('nom utilisateur ou mot de passe non valide', 2000, 'top', 'danger');
        } else {
            this.connexion();
        }
    }

    /**
     * @description permet de verifier l'existance d'un utilisateur en base de données
     */
    async connexion() {
        this.loaderToShow = await this.loadCtrl.create({
            message: 'Connexion...',
            spinner: 'crescent'
        });
        await this.loaderToShow.present();

        this.userSrvc.login(this.loginUser, this.password).subscribe(response => {
            this.loadCtrl.dismiss();
            if (response) {
                this.router.navigate(['dashbord']);
                this.userSrvc.alertMsg(`Bienvenu ${response.nom}`, 2000, 'top', 'success');
            } else {
                this.userSrvc.alertMsg('Mot de passe ou login incorrect', 3000, 'top', 'danger');
            }
        }, error1 => {
            this.userSrvc.alertMsg(error1.message, 3500, 'top', 'danger');
            this.loadCtrl.dismiss();
        });
    }

}
