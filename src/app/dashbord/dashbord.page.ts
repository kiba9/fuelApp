import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-dashbord',
    templateUrl: './dashbord.page.html',
    styleUrls: ['./dashbord.page.scss'],
})
export class DashbordPage implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    /**
     * @description permet la navigation entre les pages du menu
     * @param page nom de la page cible
     */
    openPage(page: string) {
        this.router.navigate([page]);
    }

}
