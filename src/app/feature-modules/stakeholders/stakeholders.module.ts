import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CompanySearchComponent } from './company-search/company-search.component';

@NgModule({
  declarations: [UserProfileComponent, RegistrationFormComponent, CompanySearchComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [UserProfileComponent, RegistrationFormComponent],
})
export class StakeholdersModule {}
