import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegUserHomePageComponent } from './reg-user-home-page.component';

describe('RegUserHomePageComponent', () => {
  let component: RegUserHomePageComponent;
  let fixture: ComponentFixture<RegUserHomePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegUserHomePageComponent]
    });
    fixture = TestBed.createComponent(RegUserHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
