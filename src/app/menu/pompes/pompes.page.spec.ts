import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PompesPage } from './pompes.page';

describe('PompesPage', () => {
  let component: PompesPage;
  let fixture: ComponentFixture<PompesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PompesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PompesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
