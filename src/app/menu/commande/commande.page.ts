import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-commande',
    templateUrl: './commande.page.html',
    styleUrls: ['./commande.page.scss'],
})
export class CommandePage implements OnInit {

    segmentModel = 'enAttente';
    dataList = [];

    constructor() {
    }

    ngOnInit() {
        this.getData();
    }

    segmentChanged() {
        this.getData();
    }

    doRefresh(event) {
        console.log('Begin async operation');

        setTimeout(() => {
            console.log('Async operation has ended');
            event.target.complete();
        }, 2000);
    }

    async getData(): Promise<void> {
        this.dataList = [];
        setTimeout(() => {
            const cpt = (this.segmentModel === 'enAttente') ? 3 : (this.segmentModel === 'enCours') ? 7 : 10;
            for (let i = 0; i < cpt; i++) {
                const item: any = {
                    libelle: 'Item number ' + this.dataList.length,
                    typeCarburant: 'essence',
                    fournisseur: 'topOil',
                    volumeCommande: 100000,
                    volumeLivre: 70000,
                    dateCommande: '10/02/2020',
                    dateLivraison: '15/02/2020'
                };
                this.dataList.push(item);
            }
        }, 2000);
    }

}
