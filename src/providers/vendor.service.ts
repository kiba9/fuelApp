import {DataProviderService} from './dataProvider.service';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class VendorService {

    endPoint = 'api/fournisseur/';

    constructor(private provider: DataProviderService) {
    }

    getAllVendor() {
        const url = this.endPoint + 'listerFournisseur/';
        return this.provider.submitGet(url);
    }

    createVendor(data) {
        const url = this.endPoint + 'creerFournisseur/';
        return this.provider.submitPost(url, data);
    }

    updateVendor(data) {
        const url = this.endPoint + 'modifierFournisseur/';
        return this.provider.submitPut(url, data);
    }

    deleteVendor(id) {
        const url = this.endPoint + 'supprimerFournisseur/' + id;
        return this.provider.submitDelete(url);
    }

    alertMsg(msg, dur, pos, colr) {
        this.provider.alertMsg(msg, dur, pos, colr);
    }
}
