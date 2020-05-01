import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {VendoraddPage} from './vendoradd.page';

describe('VendoraddPage', () => {
    let component: VendoraddPage;
    let fixture: ComponentFixture<VendoraddPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [VendoraddPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(VendoraddPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
