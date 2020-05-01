import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StationlistPage } from './stationlist.page';

describe('StationlistPage', () => {
  let component: StationlistPage;
  let fixture: ComponentFixture<StationlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StationlistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StationlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
