import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FournisseurPage } from './fournisseur.page';

describe('FournisseurPage', () => {
  let component: FournisseurPage;
  let fixture: ComponentFixture<FournisseurPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FournisseurPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FournisseurPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
