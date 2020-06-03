import { Injectable } from '@angular/core';
import {DataProviderService} from './dataProvider.service';
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class IndexCarburantService {

    endPoint = 'api/index/';

    constructor(private provider: DataProviderService) {
    }

    getAllIndexCarburant(): Observable<any> {
        const url = this.endPoint + 'listerIndex/';
        return this.provider.submitGet(url);
    }

    createIndexCarburant(data) {
        const url = this.endPoint + 'creerIndex/';
        return this.provider.submitPost(url, data);
    }

    updateIndexCarburant(data) {
        const url = this.endPoint + 'modifierIndex/';
        return this.provider.submitPut(url, data);
    }

    deleteIndexCarburant(id) {
        const url = this.endPoint + 'supprimerIndex/' + id;
        return this.provider.submitDelete(url);
    }

    alertMsg(msg, dur, pos, colr) {
        this.provider.alertMsg(msg, dur, pos, colr);
    }
}
