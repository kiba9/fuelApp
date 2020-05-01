import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {DashbordPage} from './dashbord.page';

describe('DashbordPage', () => {
    let component: DashbordPage;
    let fixture: ComponentFixture<DashbordPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DashbordPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(DashbordPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
