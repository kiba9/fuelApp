import {Component, OnInit} from '@angular/core';
import {VendorService} from '../../../providers/vendor.service';
import {ModalController, ToastController} from '@ionic/angular';
import {VendoraddPage} from '../vendoradd/vendoradd.page';
import {Vendor} from '../../../models/vendor';
import {UseraddPage} from '../../user/useradd/useradd.page';

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

    constructor(public vendorSvrc: VendorService, public toastCtrl: ToastController, public modalCtrl: ModalController) {
    }

    ngOnInit() {
        this.getVendorList();
    }

    /**
     * @description recuperer la liste des fournisseurs en base de donnée
     */
    getVendorList() {
        this.vendorList = this.vendorFilterList = null;
        this.vendorSvrc.getAllVendor().subscribe(value => {
            console.log(value);
            this.vendorList = this.vendorFilterList = value;
        }, async error1 => {
            console.log(error1);
            this.vendorList = this.vendorFilterList = [];
            this.vendorSvrc.alertMsg(error1.message, 4000, 'middle', 'warning');
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
        this.vendorFilterList = this.vendorFilterList.filter(utilisateur => {
            if (utilisateur.nom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
                return true;
            } else if (utilisateur.prenom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
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
                vndr: this.fournisseur,
                func: 'create'
            }
        });

        modal.onDidDismiss().then((response) => {
            if (response.data) {
                this.vendorList.push(response.data);
                this.vendorSvrc.alertMsg('Fournisseur crée avec succeès', 2000, 'top', 'success');
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
                    this.vendorSvrc.deleteVendor(vndor.idFournisseur).subscribe(value => {
                        this.vendorSvrc.alertMsg('Fournisseur Supprimé avec succès', 2000, 'top', 'success');
                    }, error1 => {
                        this.vendorSvrc.alertMsg(error1.error.message, 4000, 'top', 'danger');
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
                this.vendorSvrc.alertMsg('Fournisseur Modifié avec succeès', 2000, 'top', 'success');
            }
        });

        await modal.present();
    }

}
