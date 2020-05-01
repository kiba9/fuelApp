import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {FuellistPage} from './fuellist.page';

describe('FuellistPage', () => {
    let component: FuellistPage;
    let fixture: ComponentFixture<FuellistPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FuellistPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(FuellistPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
