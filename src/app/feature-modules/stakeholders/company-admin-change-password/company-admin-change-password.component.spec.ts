import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAdminChangePasswordComponent } from './company-admin-change-password.component';

describe('CompanyAdminChangePasswordComponent', () => {
  let component: CompanyAdminChangePasswordComponent;
  let fixture: ComponentFixture<CompanyAdminChangePasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyAdminChangePasswordComponent]
    });
    fixture = TestBed.createComponent(CompanyAdminChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
