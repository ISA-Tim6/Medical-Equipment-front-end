import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyFormComponent } from './company-form/company-form.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SystemAdminFormComponent } from './system-admin-form/system-admin-form.component';
import { CompanyAdminFormComponent } from './company-admin-form/company-admin-form.component';
import { StakeholdersModule } from '../stakeholders/stakeholders.module';

@NgModule({
  declarations: [
    CompanyFormComponent,
    SystemAdminFormComponent,
    CompanyAdminFormComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, StakeholdersModule],
})
export class SystemAdminModule {}
