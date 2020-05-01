import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.page.html',
    styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

    map: any;
    adresse: string;
    station: any;

    constructor(public router: Router) {
        if (router.getCurrentNavigation().extras.state) {
            this.station = this.router.getCurrentNavigation().extras.state.item;
        }
    }

    ngOnInit() {
    }

}
