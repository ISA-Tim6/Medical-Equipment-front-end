import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CompanyFormComponent } from './company-form/company-form.component';
import { SystemAdminFormComponent } from './system-admin-form/system-admin-form.component';
import { CompanyAdminFormComponent } from './company-admin-form/company-admin-form.component';
import { EquipmentSearchComponent } from './equipment-search/equipment-search.component';
import { SystemAdminHomePageComponent } from './system-admin-home-page/system-admin-home-page.component';


@NgModule({
  declarations: [
    CompanyFormComponent,
    SystemAdminFormComponent,
    CompanyAdminFormComponent,
    EquipmentSearchComponent,
    SystemAdminHomePageComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class SystemAdminModule {}
