import { Injectable } from '@angular/core';
import {DataProviderService} from './dataProvider.service';


@Injectable({
    providedIn: 'root'
})

export class PompeService {

    endPoint = 'api/pompe/';

    constructor(private provider: DataProviderService) {
    }

    getAllPompes() {
        const url = this.endPoint + 'listerPompe';
        return this.provider.submitGet(url);
    }

    createPompe(data) {
        const url = this.endPoint + 'creerPompe/';
        return this.provider.submitPost(url, data);
    }

    updatePompe(data) {
        const url = this.endPoint + 'modifierPompe/';
        return this.provider.submitPut(url, data);
    }

    deletePompe(id) {
        const url = this.endPoint + 'supprimerPompe/' + id;
        return this.provider.submitDelete(url);
    }

    alertMsg(msg, dur, pos, colr) {
        this.provider.alertMsg(msg, dur, pos, colr);
    }
}
