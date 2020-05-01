import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ToastController} from '@ionic/angular';
import {NavigationExtras} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class DataProviderService {

    server = 'http://localhost:8085/fueltracker-0.0.1-SNAPSHOT/';

    optionRequete = {
        headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        })
    };

    constructor(private http: HttpClient, public toastCtrl: ToastController) {
    }

    /* permet de transmettre un objet utilisateur a une autre page
    * @param: usr
    * return NavigationExtra
    * */
    static setExtras(itm: any): NavigationExtras {
        return {
            state: {
                item: itm
            }
        };
    }

    static validateString(charSequence) {
        return !(charSequence == null || charSequence === '');
    }

    async showToast(msg, time, pos, colr) {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: time,
            position: pos,
            color: colr
        });
        toast.present();
    }

    submitGet(urlBase, body?): Observable<any> {
        return this.http.get(this.server + urlBase, body).pipe(
            catchError(this.handleError)
        );
    }

    submitPost(urlBase, body?): Observable<any> {
        return this.http.post(this.server + urlBase, body).pipe(
            catchError(this.handleError)
        );
    }

    submitPut(urlBase, body?): Observable<any> {
        return this.http.put(this.server + urlBase, body).pipe(
            catchError(this.handleError)
        );
    }

    submitDelete(urlBase, body?): Observable<any> {
        return this.http.delete(this.server + urlBase, body).pipe(
            catchError(this.handleError)
        );
    }

    handleError(error) {
        return throwError(error);
    }


}
