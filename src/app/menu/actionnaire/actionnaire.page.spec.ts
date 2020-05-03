import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ActionnairePage } from './actionnaire.page';

describe('ActionnairePage', () => {
  let component: ActionnairePage;
  let fixture: ComponentFixture<ActionnairePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionnairePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ActionnairePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
