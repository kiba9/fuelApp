import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ActionaddPage } from './actionadd.page';

describe('ActionaddPage', () => {
  let component: ActionaddPage;
  let fixture: ComponentFixture<ActionaddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionaddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ActionaddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
