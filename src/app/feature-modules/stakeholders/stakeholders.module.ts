import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CompanyAdminProfileComponent } from './company-admin-profile/company-admin-profile.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CompanyCalendarComponent } from './company-calendar/company-calendar.component';
import { CompanyAdminChangePasswordComponent } from './company-admin-change-password/company-admin-change-password.component';
import { RegUserHomePageComponent } from './reg-user-home-page/reg-user-home-page.component';
import { QrComponent } from './qr/qr.component';
import { EquipmentDeliveryComponent } from './equipment-delivery/equipment-delivery.component';
import { DeliveriesComponent } from './deliveries/deliveries.component';
import { FutureAppointmentsComponent } from './future-appointments/future-appointments.component';

@NgModule({
  declarations: [
    UserProfileComponent,
    RegistrationFormComponent,
    CompanyAdminProfileComponent,
    CompanyCalendarComponent,
    CompanyAdminChangePasswordComponent,
    RegUserHomePageComponent,
    QrComponent,
    EquipmentDeliveryComponent,
    DeliveriesComponent,
    FutureAppointmentsComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, FullCalendarModule],
  exports: [
    UserProfileComponent,
    RegistrationFormComponent,
    RegUserHomePageComponent,
    EquipmentDeliveryComponent,
  ],
})
export class StakeholdersModule {}
