import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {VendorlistPage} from './vendorlist.page';

describe('VendorlistPage', () => {
    let component: VendorlistPage;
    let fixture: ComponentFixture<VendorlistPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [VendorlistPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(VendorlistPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
