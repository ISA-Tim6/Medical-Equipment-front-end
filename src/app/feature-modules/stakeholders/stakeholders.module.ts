import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CompanyAdminProfileComponent } from './company-admin-profile/company-admin-profile.component';
import { CompanyAdminChangePasswordComponent } from './company-admin-change-password/company-admin-change-password.component';

@NgModule({
  declarations: [
    UserProfileComponent,
    RegistrationFormComponent,
    CompanyAdminProfileComponent,
    CompanyAdminChangePasswordComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [UserProfileComponent, RegistrationFormComponent],
})
export class StakeholdersModule {}
