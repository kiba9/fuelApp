import { Injectable } from '@angular/core';
import {DataProviderService} from './dataProvider.service';


@Injectable({
    providedIn: 'root'
})

export class ReservoirService {

    endPoint = 'api/reservoir/';

    constructor(private provider: DataProviderService) {
    }

    getAllReservoir() {
        const url = this.endPoint + 'listerReservoir/';
        return this.provider.submitGet(url);
    }

    createReservoir(data) {
        const url = this.endPoint + 'creerReservoir/';
        return this.provider.submitPost(url, data);
    }

    updateReservoir(data) {
        const url = this.endPoint + 'modifierReservoir/';
        return this.provider.submitPut(url, data);
    }

    deleteReservoir(id) {
        const url = this.endPoint + 'supprimerReservoir/' + id;
        return this.provider.submitDelete(url);
    }

    alertMsg(msg, dur, pos, colr) {
        this.provider.showToast(msg, dur, pos, colr);
    }

}
