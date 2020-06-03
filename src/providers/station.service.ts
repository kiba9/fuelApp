import { Injectable } from '@angular/core';
import {DataProviderService} from './dataProvider.service';



@Injectable({
    providedIn: 'root'
})
export class StationService {

    endPoint = 'api/stationService/';

    constructor(private provider: DataProviderService) {
    }

    createStation(data) {
        const url = this.endPoint + 'creerStationService/';
        return this.provider.submitPost(url, data);
    }

    getAllStation() {
        const url = this.endPoint + 'listerStationService';
        return this.provider.submitGet(url);
    }

    updateStation(data) {
        const url = this.endPoint + 'modifierStationService/';
        return this.provider.submitPut(url, data);
    }

    deleteStation(id) {
        const url = this.endPoint + 'supprimerStationService/' + id;
        return this.provider.submitDelete(url);
    }

    alertMsg(msg, dur, pos, colr) {
        this.provider.alertMsg(msg, dur, pos, colr);
    }

}
