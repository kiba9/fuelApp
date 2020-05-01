import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StationaddPage } from './stationadd.page';

describe('StationaddPage', () => {
  let component: StationaddPage;
  let fixture: ComponentFixture<StationaddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StationaddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StationaddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
