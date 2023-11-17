import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './feature-modules/stakeholders/user-profile/user-profile.component';
import { CompanyFormComponent } from './feature-modules/system-admin/company-form/company-form.component';
import { SystemAdminFormComponent } from './feature-modules/system-admin/system-admin-form/system-admin-form.component';
import { CompanyAdminFormComponent } from './feature-modules/system-admin/company-admin-form/company-admin-form.component';
import { RegistrationFormComponent } from './feature-modules/stakeholders/registration-form/registration-form.component';
import { CompanyAdminProfileComponent } from './feature-modules/stakeholders/company-admin-profile/company-admin-profile.component';
import { CompanyProfileComponent } from './feature-modules/company-profile/company-profile.component';
import { CompaniesOverviewComponent } from './feature-modules/companies-overview/companies-overview.component';
import { CompanyOverviewComponent } from './feature-modules/company-overview/company-overview.component';
import { EquipmentSearchComponent } from './feature-modules/system-admin/equipment-search/equipment-search.component';
import { LoginFormComponent } from './feature-modules/login-form/login-form.component';
const routes: Routes = [
  {
    path: 'user-profile',
    component: UserProfileComponent,
  },


  {path: 'company-form', component: CompanyFormComponent},
  {path: 'system-admin-form', component: SystemAdminFormComponent},
  {path: 'company-admin-form', component: CompanyAdminFormComponent},

  {
    path: 'registration',
    component: RegistrationFormComponent,
  },

  {
    path: 'company-admin-profile',
    component: CompanyAdminProfileComponent,
  },
  {
    path: 'company/:company_id/:user_id',
    component: CompanyProfileComponent,
  },
  {
    path: 'company/:company_id',
    component: CompanyOverviewComponent,
  },
  {
    path:'companies',
    component:CompaniesOverviewComponent
  },
  { path: 'equipment-search', component: EquipmentSearchComponent},
  {
    path:'login',
    component:LoginFormComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
