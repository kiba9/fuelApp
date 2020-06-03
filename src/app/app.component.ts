import {Component} from '@angular/core';

import {NavController, Platform, ToastController} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private router: Router,
        private toastCtrl: ToastController,
        private navController: NavController,
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.statusBar.overlaysWebView(false);
            this.statusBar.backgroundColorByHexString('#003a82');
            this.splashScreen.hide();

            this.platform.backButton.subscribe(() => {
                console.log("BackPressed");

                if (this.router.url === "/dashbord" || this.router.url === "/home") {
                    this.showExitToast();
                } else {
                    this.navController.back();
                }
            });

        });


    }

    async showExitToast(){
        const toast = await this.toastCtrl.create({
            message: 'voulez vous vraiment sortir de l\'application ?',
            color: 'dark',
            duration: 5000,
            position: 'bottom',
            animated: true,
            translucent: true,
            header: 'Quittez L\'application ?',
            buttons: [
                {
                    text: 'oui',
                    icon: 'exit',
                    side: 'end',
                    handler: () => {
                        navigator["app"].exitApp();
                    }
                },
                {
                    text:'non',
                    side: 'start',
                    role: 'cancel'
                }
            ]


        });
        await toast.present();
    }
}
