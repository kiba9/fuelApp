import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../providers/user.service';
import {LoadingController, ToastController} from '@ionic/angular';
import {DataProviderService} from '../../providers/dataProvider.service';
import {HTTP} from '@ionic-native/http/ngx';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    loginUser: string;
    password: string;
    loaderToShow: any;

    constructor(private router: Router, private userSrvc: UserService, public loadCtrl: LoadingController,
                public nativeHttp: HTTP, public toastCtrl: ToastController) {
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
     * @description permet de verifier si les champs rentrer sont vide ou pas et appelle la fonction connexion
     */
    submitRequest() {
        if (!DataProviderService.validateString(this.loginUser) || !DataProviderService.validateString(this.password)) {
            this.alertMsg('nom utilisateur ou mot de passe non valide', 2000, 'top', 'danger');
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

        this.nativeHttp.get(DataProviderService.loginUser + this.loginUser + '/' + this.password + '/',
            {}, {}).then((response) => {
            this.loadCtrl.dismiss();
            response.data = JSON.parse(response.data);
            this.router.navigate(['dashbord']);
            this.router.dispose();
            this.alertMsg(`Bienvenu ${response.data.nom}` , 2000, 'top', 'success')
        }).catch((error) => {
            console.log(error);
            if(error.error) this.alertMsg(error.error, 3500, 'top', 'danger');
            else this.alertMsg('Login ou mot de passe incorrect', 3500, 'top', 'danger');

            this.loadCtrl.dismiss();
        });
    }
}
