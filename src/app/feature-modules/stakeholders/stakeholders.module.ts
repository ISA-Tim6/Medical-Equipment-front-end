import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CompanyAdminProfileComponent } from './company-admin-profile/company-admin-profile.component';
import { FullCalendarModule} from '@fullcalendar/angular'
import { CompanyCalendarComponent } from './company-calendar/company-calendar.component';
import { CompanyAdminChangePasswordComponent } from './company-admin-change-password/company-admin-change-password.component';

@NgModule({
  declarations: [
    UserProfileComponent,
    RegistrationFormComponent,
    CompanyAdminProfileComponent,
    CompanyCalendarComponent,
    CompanyAdminChangePasswordComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, FullCalendarModule],
  exports: [UserProfileComponent, RegistrationFormComponent],
})
export class StakeholdersModule {}
