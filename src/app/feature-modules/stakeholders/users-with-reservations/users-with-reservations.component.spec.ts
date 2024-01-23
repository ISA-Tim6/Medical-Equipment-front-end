import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersWithReservationsComponent } from './users-with-reservations.component';

describe('UsersWithReservationsComponent', () => {
  let component: UsersWithReservationsComponent;
  let fixture: ComponentFixture<UsersWithReservationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersWithReservationsComponent]
    });
    fixture = TestBed.createComponent(UsersWithReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
