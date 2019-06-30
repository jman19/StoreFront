import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralNavBarComponent } from './general-nav-bar.component';

describe('GeneralNavBarComponent', () => {
  let component: GeneralNavBarComponent;
  let fixture: ComponentFixture<GeneralNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
