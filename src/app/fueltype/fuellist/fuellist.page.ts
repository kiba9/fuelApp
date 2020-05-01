import {Component, OnInit} from '@angular/core';
import {Fuel} from '../../../models/fuel';
import {ModalController, PopoverController, ToastController} from '@ionic/angular';
import {FuelService} from '../../../providers/fuel.service';
import {FueltypeaddPage} from '../fueltypeadd/fueltypeadd.page';
import {SettingsComponent} from '../../components/settings/settings.component';

@Component({
    selector: 'app-fuellist',
    templateUrl: './fuellist.page.html',
    styleUrls: ['./fuellist.page.scss'],
})
export class FuellistPage implements OnInit {

    fuelList = [];
    isDelete = false;
    fuel: Fuel = new Fuel();

    constructor(public modalCtrl: ModalController, public fuelSvrc: FuelService, public toastCtrl: ToastController,
                public popoverCtrl: PopoverController) {
    }

    ngOnInit() {
        this.getFuelTypes();
    }

    /**
     * @description recuperer la liste des fournisseurs en base de donnée
     */
    getFuelTypes() {
        this.fuelList = null;
        this.fuelSvrc.getAllFuelTypes().subscribe(value => {
            console.log(value);
            this.fuelList = value;
        }, async error1 => {
            console.log(error1);
            this.fuelList = [];
            this.fuelSvrc.alertMsg(error1.message, 4000, 'middle', 'warning');
        });
    }

    /**
     * @description permet d'ajouter un type de carburant a notre base de données
     */
    async createFuel() {

        const modal = await this.modalCtrl.create({
            animated: true,
            component: FueltypeaddPage,
            componentProps: {
                fueltype: this.fuel,
                func: 'create'
            }
        });

        modal.onDidDismiss().then((response) => {
            if (response.data) {
                this.fuelList.push(response.data);
                this.fuelSvrc.alertMsg('Type Carburant crée avec succeès', 2000, 'top', 'success');
            }
        });

        return await modal.present();
    }

    /**
     * @description permet de supprimer un type carburant de la base de donnée avec possibilité d'annuler sous 5 sec
     * @param fueltyp type carburant a supprimer
     */
    async deleteFuelType(fueltyp) {
        // on retire le type carburant de la liste et on indique au systeme que l'on veut faire une suppréssion
        const index: number = this.fuelList.indexOf(fueltyp);
        this.fuelList.splice(index, 1);
        this.isDelete = true;

        // on affiche un toast pendant 5 sec permettant d'annuler l'action une fois le delai passé la suppresion sera définitive
        const toast = await this.toastCtrl.create({
            message: `Suppression de ${fueltyp.libelle}...`,
            color: 'tertiary',
            duration: 5000,
            buttons: [
                // boutton permettant d'annuler la suppression
                {
                    text: 'Annuler',
                    role: 'cancel',
                    handler: () => {
                        // on indique au systeme que l'on ne veut plus faire de suppression et on remet le type carburant a sa position
                        this.isDelete = false;
                        this.fuelList.splice(index, 0, fueltyp);
                    }
                }
            ]
        }).then((response) => {
            response.present();
            // une fois le delai de 5 sec passé, si la demande de suppression est effective on supprime alors en BD
            response.onWillDismiss().then((res) => {
                if (this.isDelete) {
                    this.fuelSvrc.deleteFuelType(fueltyp.idTypeCarburant).subscribe(value => {
                        this.fuelSvrc.alertMsg('Fournisseur Supprimé avec succès', 2000, 'top', 'success');
                    }, error1 => {
                        this.fuelSvrc.alertMsg(error1.message, 4000, 'bottom', 'danger');
                        this.isDelete = false;
                        this.fuelList.splice(index, 0, fueltyp);
                    });
                }
            });
        });
    }

    /**
     * @description cette fonction ouvre un modal en mode modification pour changer les information d'un type de carburant
     * @param fueltyp utilisateur a modifier
     */
    async updateFuelType(fueltyp) {
        const modal = await this.modalCtrl.create({
            animated: true,
            component: FueltypeaddPage,
            componentProps: {
                fueltype: fueltyp,
                func: 'update'
            }
        });

        modal.onDidDismiss().then((response) => {
            if (response.data) {
                const pos: number = this.fuelList.indexOf(fueltyp);
                this.fuelList.splice(pos, 1);
                this.fuelList.splice(pos, 0, response.data);
                this.fuelSvrc.alertMsg('Fournisseur Modifié avec succeès', 2000, 'top', 'success');
            }
        });

        await modal.present();
    }

    /**
     * permet d'afficher le menu contextuel et choisir une option
     * @param ev evenemet
     * @param itemfuel l'objet a supprimer
     */
    async doOperation(ev: any, itemfuel) {
        // on affiche le menu contextuel
        const popover = await this.popoverCtrl.create({
            component: SettingsComponent,
            event: ev,
        });

        // lorsque celui ci est sur le ppoint de disparaitre il reccupere la valeur de l'option choisi et applle  la fonction adequate
        popover.onDidDismiss().then((response) => {
            if (response.data === 'update') {
                this.updateFuelType(itemfuel);
                console.log(response.data);
            } else if (response.data === 'delete') {
                this.deleteFuelType(itemfuel);
            }
        });

        return await popover.present();
    }

}
