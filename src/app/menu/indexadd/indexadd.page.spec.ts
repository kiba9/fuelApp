import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IndexaddPage } from './indexadd.page';

describe('IndexaddPage', () => {
  let component: IndexaddPage;
  let fixture: ComponentFixture<IndexaddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexaddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IndexaddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
