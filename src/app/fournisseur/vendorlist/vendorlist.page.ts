import {Component, OnInit} from '@angular/core';
import {VendorService} from '../../../providers/vendor.service';
import {ModalController, ToastController} from '@ionic/angular';
import {VendoraddPage} from '../vendoradd/vendoradd.page';
import {Vendor} from '../../../models/vendor';
import {UseraddPage} from '../../user/useradd/useradd.page';
import {HTTP} from '@ionic-native/http/ngx';
import {DataProviderService} from '../../../providers/dataProvider.service';

@Component({
    selector: 'app-vendorlist',
    templateUrl: './vendorlist.page.html',
    styleUrls: ['./vendorlist.page.scss'],
})
export class VendorlistPage implements OnInit {

    vendorList = [];
    vendorFilterList: any[];
    isDelete = false;
    fournisseur: Vendor = new Vendor();

    constructor(public toastCtrl: ToastController, public modalCtrl: ModalController, public nativeHttp: HTTP) {
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
        this.getVendorList();
    }

    /**
     * @description recuperer la liste des fournisseurs en base de donnée
     */
    getVendorList() {
        this.vendorList = this.vendorFilterList = null;
        this.nativeHttp.get(DataProviderService.getAllVendor, {}, {}).then((response) => {
            console.log(response.data);
            response.data = JSON.parse(response.data);
            this.vendorList = this.vendorFilterList = response.data;
        }).catch((error) => {
            console.log(error.error);
            this.vendorList = this.vendorFilterList = [];
            this.alertMsg(error.error, 3500, 'middle', 'warning');
        });
    }

    /**
     * @description permet d'effectuer une recherche en fonction de ce que l'utilisateur entre sur la barre de recherche
     * @param event permet de recuperer la valeur de la barre de recherche
     */
    filterList(event) {
        this.vendorFilterList = this.vendorList;
        const searchTerm = event.target.value;

        if (!searchTerm) {
            return;
        }

        // On fait un trie en fonction des nom ou des prenom commençant par la lettre saisie
        this.vendorFilterList = this.vendorList.filter(vnd => {
            if (vnd.nom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
                return true;
            }
        });
    }

    /**
     * @description permet de creer un fournisseur en base de donnée
     */
    async createVendor() {
        const modal = await this.modalCtrl.create({
            animated: true,
            component: VendoraddPage,
            componentProps: {
                vndr: new Vendor(),
                func: 'create'
            }
        });

        modal.onDidDismiss().then((response) => {
            if (response.data) {
                this.vendorList.push(response.data);
                this.alertMsg('Fournisseur Créer avec succès', 3500, 'top', 'success');
            }
        });

        await modal.present();
    }

    /**
     * @description permet de supprimer un fournisseur de la base de donnée avec possibilité d'annuler sous 5 sec
     * @param vndor utilisateur a supprimer
     */
    async deleteVendor(vndor) {
        // on retire le fournisseur de la liste et on indique au systeme que l'on veut faire une suppréssion
        const index: number = this.vendorList.indexOf(vndor);
        this.vendorList.splice(index, 1);
        this.isDelete = true;

        // on affiche un toast pendant 5 sec permettant d'annuler l'action une fois le delai passé la suppresion sera définitive
        const toast = await this.toastCtrl.create({
            message: `Suppression de ${vndor.nom}...`,
            color: 'tertiary',
            duration: 5000,
            buttons: [
                // boutton permettant d'annuler la suppression
                {
                    text: 'Annuler',
                    role: 'cancel',
                    handler: () => {
                        // on indique au systeme que l'on ne veut plus faire de suppression et on remet le fournisseur a sa position
                        this.isDelete = false;
                        this.vendorList.splice(index, 0, vndor);
                    }
                }
            ]
        }).then((response) => {
            response.present();
            // une fois le delai de 5 sec passé, si la demande de suppression est effective on supprime alors en BD
            response.onWillDismiss().then((res) => {
                if (this.isDelete) {
                    this.nativeHttp.delete(DataProviderService.deleteVendor + vndor.idFournisseur +'/', {}, {}).then((response) => {
                        this.alertMsg('Fournisseur Supprimé avec succès', 2000, 'top', 'success');
                    }).catch((error1) => {
                        DataProviderService.alertBox(error1.error, 4000, 'top', 'danger');
                        this.isDelete = false;
                        this.vendorList.splice(index, 0, vndor);
                    });
                }
            });
        });
    }

    /**
     * @description cette fonction ouvre un modal en mode modification pour changer les information d'un fournisseur
     * @param vndor utilisateur a modifier
     */
    async updateVendor(vndor) {
        const modal = await this.modalCtrl.create({
            animated: true,
            component: VendoraddPage,
            componentProps: {
                vndr: vndor,
                func: 'update'
            }
        });

        modal.onDidDismiss().then((response) => {
            if (response.data) {
                const pos: number = this.vendorList.indexOf(vndor);
                this.vendorList.splice(pos, 1);
                this.vendorList.splice(pos, 0, response.data);
               this.alertMsg('Fournisseur Modifié avec succeès', 2000, 'top', 'success');
            }
        });

        await modal.present();
    }

}
