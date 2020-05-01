import {DataProviderService} from './dataProvider.service';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class FuelService {

    endPoint = 'api/typeCarburant/';

    constructor(private provider: DataProviderService) {
    }

    getAllFuelTypes() {
        const url = this.endPoint + 'listerTypeCarburant/';
        return this.provider.submitGet(url);
    }

    createFuelType(data) {
        const url = this.endPoint + 'creerTypeCarburant/';
        return this.provider.submitPost(url, data);
    }

    updateFuelType(data) {
        const url = this.endPoint + 'modifierTypeCarburant/';
        return this.provider.submitPut(url, data);
    }

    deleteFuelType(id) {
        const url = this.endPoint + 'supprimerTypeCarburant/' + id;
        return this.provider.submitDelete(url);
    }

    alertMsg(msg, dur, pos, colr) {
        this.provider.showToast(msg, dur, pos, colr);
    }
}
