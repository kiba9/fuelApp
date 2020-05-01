import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {UseraddPage} from './useradd.page';

describe('UseraddPage', () => {
    let component: UseraddPage;
    let fixture: ComponentFixture<UseraddPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UseraddPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(UseraddPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
