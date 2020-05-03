import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReservoirPage } from './reservoir.page';

describe('ReservoirPage', () => {
  let component: ReservoirPage;
  let fixture: ComponentFixture<ReservoirPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservoirPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReservoirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
