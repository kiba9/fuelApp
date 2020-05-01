import {Injectable} from '@angular/core';
import {DataProviderService} from './dataProvider.service';
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class UserService {

    endPoint = 'api/utilisateur/';

    constructor(private provider: DataProviderService) {
    }

    login(login: string, password: string) {
        const url = this.endPoint + 'loginUtilisateur/' + login + '/' + password + '/';
        console.log(url);
        return this.provider.submitGet(url);
    }

    getAllUser() {
        const url = this.endPoint + 'listerUtilisateur/';
        return this.provider.submitGet(url);
    }

    createUser(data): Observable<any> {
        const url = this.endPoint + 'creerUtilisateur/';
        return this.provider.submitPost(url, data);
    }

    updateUser(data) {
        const url = this.endPoint + 'modifierUtilisateur/';
        return this.provider.submitPut(url, data);
    }

    deleteUser(id) {
        const url = this.endPoint + 'supprimerUtilisateur/' + id;
        return this.provider.submitDelete(url);
    }

    alertMsg(msg, dur, pos, colr) {
        this.provider.showToast(msg, dur, pos, colr);
    }

}
