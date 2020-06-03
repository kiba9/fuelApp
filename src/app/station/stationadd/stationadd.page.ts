import { Component, OnInit } from '@angular/core';
import {LoadingController, ModalController, NavParams, ToastController} from '@ionic/angular';
import {DataProviderService} from '../../../providers/dataProvider.service';
import {HTTP} from '@ionic-native/http/ngx';

@Component({
  selector: 'app-stationadd',
  templateUrl: './stationadd.page.html',
  styleUrls: ['./stationadd.page.scss'],
})
export class StationaddPage implements OnInit {

  station;
  isCreate = true;
  loaderToShow: any;


  constructor(public navParams: NavParams, public modalCtrl: ModalController, public nativeHttp: HTTP,
              public toastCtrl: ToastController, public loadCtrl: LoadingController ) {
    this.nativeHttp.setDataSerializer('json');
    // recuperation du type de carburant passé en paramettre
    this.station = navParams.get('stationItem');
    // On indique si il s'agit de la mise a jour ou de la creation d'un utilisateur
    if (navParams.get('func') === 'update') {
      this.isCreate = false;
    }
  }

  ngOnInit() {
  }

  async alertMsg(msg, time, pos, colr) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: time,
      position: pos,
      color: colr
    });
    toast.present();
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

  /**
   *  @description permet de verfier si les champs necessaire pour créer un type de carburant sont bien remplis puis
   *  applle la methode adéquate soit creer / update
   */
  submitRequest() {
    if (!DataProviderService.validateString(this.station.nom) || !DataProviderService.validateString(this.station.adresse)) {
      this.alertMsg('Remplissez entierement le formulaire', 2000, 'top', 'danger');
    } else {
      if (this.isCreate) {
        this.createStation();
      } else {
        this.updateStation();
      }
    }
  }

  /**
   * @description methode permettant d'ajouter une nouvelle station en base de données
   */
  async createStation() {
    this.loaderToShow = await this.loadCtrl.create({
      message: 'Patientez...',
      spinner: 'crescent'
    });
    await this.loaderToShow.present();

    this.nativeHttp.post(DataProviderService.createStation, this.station, {}).then((response) => {
      response.data = JSON.parse(response.data);
      if(response.data){
        this.loadCtrl.dismiss();
        this.station = response.data;
        this.modalCtrl.dismiss(this.station);
      }
    }).catch((error1) => {
      this.alertMsg(error1.message, 3500, 'top', 'danger');
      this.loadCtrl.dismiss();
    });
  }

  /**
   * @description methode permettant de modifier les information d'un fournisseur present en BD
   */
  async updateStation() {
    this.loaderToShow = await this.loadCtrl.create({
      message: 'Patientez...',
      spinner: 'crescent'
    });
    await this.loaderToShow.present();

    this.nativeHttp.put(DataProviderService.updateStation, this.station, {}).then((response) => {
      this.loadCtrl.dismiss();
      this.modalCtrl.dismiss(this.station);
    }).catch((error1) => {
      this.alertMsg(error1.message, 3500, 'top', 'danger');
      this.loadCtrl.dismiss();
    });
  }

}
