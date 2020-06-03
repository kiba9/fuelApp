import {Component, OnInit} from '@angular/core';
import {Commande} from '../../../models/commande';
import {LigneCommande} from '../../../models/ligneCommande';
import {AlertController, LoadingController, ModalController, NavParams, ToastController} from '@ionic/angular';
import {HTTP} from '@ionic-native/http/ngx';
import {DataProviderService} from '../../../providers/dataProvider.service';

@Component({
    selector: 'app-cmdeadd',
    templateUrl: './cmdeadd.page.html',
    styleUrls: ['./cmdeadd.page.scss'],
})
export class CmdeaddPage implements OnInit {

    commande: Commande = new Commande();
    ligneCommande: LigneCommande = new LigneCommande();
    listeFournisseur = [];
    listeTypCarburant = [];

    isCreate = true;
    percent = 0;
    station;
    loaderToShow: any;

    constructor(public navParams: NavParams, public modalCtrl: ModalController, public loadCtrl: LoadingController,
                public toastCtrl: ToastController, public nativeHttp: HTTP, public alertCtrl: AlertController) {
        this.nativeHttp.setDataSerializer('json');
        // recuperation du type de carburant passé en paramettre
        this.station = navParams.get('stationItem');
        this.commande = navParams.get('cmdItem');
        // On indique si il s'agit de la mise a jour ou de la creation d'un utilisateur
        if (navParams.get('func') === 'update') {
            this.isCreate = false;
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

    async closeModal() {
        await this.modalCtrl.dismiss();
    }

    ngOnInit() {
        this.getTypeCarburant();
        this.getVendors();
    }

    compareFn(e1, e2): boolean {
        return e1 && e2 ? e1.idFournisseur == e2.idFournisseur : e1 == e2;
    }

    compareFn2(e1, e2): boolean {
        return e1 && e2 ? e1.idTypeCarburant == e2.idTypeCarburant : e1 == e2;
    }

    showLcForm() {
        const lcForm = document.getElementById('lc');
        if (lcForm.className == 'product') {
            document.getElementById('lcovr').classList.replace('not_displ', 'product_bg');
            lcForm.classList.add('product_show');
        } else {
            lcForm.classList.remove('product_show');
            document.getElementById('lcovr').classList.replace('product_bg', 'not_displ');
        }
    }

    getVendors() {
        this.listeFournisseur = null;
        this.nativeHttp.get(DataProviderService.getAllVendor, {}, {}).then((response) => {
            response.data = JSON.parse(response.data);
            this.listeFournisseur = response.data;
        }).catch((error1) => {
            this.listeFournisseur = [];
            this.alertMsg(error1.error, 4000, 'middle', 'warning');
        });
    }

    getTypeCarburant() {
        this.listeTypCarburant = null;
        this.nativeHttp.get(DataProviderService.getAllFuelTypes, {}, {}).then((response) => {
            response.data = JSON.parse(response.data);
            this.listeTypCarburant = response.data;
        }).catch((error1) => {
            this.listeTypCarburant = [];
            this.alertMsg(error1.error, 4000, 'middle', 'warning');
        });
    }

    setRistournePercent(event: any) {
        if (event.target.value) {
            this.commande.ristourne = (parseFloat(event.target.value) * this.commande.prixTotal) / 100;
        }
    }

    setRistourneValue(event) {
        if (this.commande.prixTotal > 0) {
            this.percent = (parseFloat(event.target.value) * 100) / this.commande.prixTotal;
        }
    }

    setTotalCoast(event) {
        this.commande.prixTotal = this.ligneCommande.volume * this.ligneCommande.prixLitre;
    }

    addCmdLigne() {
        if (this.ligneCommande.typeCarburant != null && this.ligneCommande.volume != 0 && this.ligneCommande.prixLitre != 0) {
            this.ligneCommande.libelle = this.ligneCommande.typeCarburant.libelle;
            this.commande.listLigneCommandes.push(this.ligneCommande);
            console.log(this.ligneCommande);
            this.commande.prixTotal += this.ligneCommande.volume * this.ligneCommande.prixLitre;
            this.showLcForm();
            this.ligneCommande = new LigneCommande();
        } else {
            this.alertMsg('Remplissez les champs vide avec des valeur differentes de Zero (0)', 2000, 'bottom', 'danger');
        }

    }

    setPriceTypC(event) {
        this.ligneCommande.prixLitre = event.target.value.prixAchat;
    }

    updateLigneCmd(item: any) {
        this.ligneCommande = item;
        this.showLcForm();
        const index: number = this.commande.listLigneCommandes.indexOf(item);
        this.commande.listLigneCommandes.splice(index, 1);
    }

    async removeLigneCmd(item: any) {
        const dialog = await this.alertCtrl.create({
            header: 'Suppression',
            subHeader: 'Confirmer votre action',
            message: `Êtez-vous certains de vouloir retirer cette article de la commande ?`,
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
                        const index: number = this.commande.listLigneCommandes.indexOf(item);
                        this.commande.listLigneCommandes.splice(index, 1);
                        this.commande.prixTotal -= item.prixLitre * item.volume;
                    }
                }
            ]
        });
        await dialog.present();
    }

    async saveCommande() {
        this.loaderToShow = await this.loadCtrl.create({
            message: 'Patientez...',
            spinner: 'crescent'
        });
        await this.loaderToShow.present();

        this.commande.stationService = this.station;
        this.nativeHttp.post(DataProviderService.saveAll, this.commande, {}).then((response) => {
            response.data = JSON.parse(response.data);
            this.commande = response.data;
            this.loadCtrl.dismiss();
            this.modalCtrl.dismiss(this.commande);
        }).catch((error1) => {
            this.alertMsg(error1.message, 3500, 'top', 'danger');
            this.loadCtrl.dismiss();
        });
    }
}
