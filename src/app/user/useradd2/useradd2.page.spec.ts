import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {Useradd2Page} from './useradd2.page';

describe('Useradd2Page', () => {
    let component: Useradd2Page;
    let fixture: ComponentFixture<Useradd2Page>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [Useradd2Page],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(Useradd2Page);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
