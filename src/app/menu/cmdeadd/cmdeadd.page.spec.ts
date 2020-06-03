import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CmdeaddPage } from './cmdeadd.page';

describe('CmdeaddPage', () => {
  let component: CmdeaddPage;
  let fixture: ComponentFixture<CmdeaddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmdeaddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CmdeaddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
