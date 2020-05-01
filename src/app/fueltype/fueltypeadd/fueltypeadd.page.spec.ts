import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {FueltypeaddPage} from './fueltypeadd.page';

describe('FueltypeaddPage', () => {
    let component: FueltypeaddPage;
    let fixture: ComponentFixture<FueltypeaddPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FueltypeaddPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(FueltypeaddPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
