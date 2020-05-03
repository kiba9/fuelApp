import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReservoiraddPage } from './reservoiradd.page';

describe('ReservoiraddPage', () => {
  let component: ReservoiraddPage;
  let fixture: ComponentFixture<ReservoiraddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservoiraddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReservoiraddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
