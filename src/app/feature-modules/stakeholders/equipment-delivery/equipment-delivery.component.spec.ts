import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentDeliveryComponent } from './equipment-delivery.component';

describe('EquipmentDeliveryComponent', () => {
  let component: EquipmentDeliveryComponent;
  let fixture: ComponentFixture<EquipmentDeliveryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EquipmentDeliveryComponent]
    });
    fixture = TestBed.createComponent(EquipmentDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
