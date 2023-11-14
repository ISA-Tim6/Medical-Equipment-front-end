import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './feature-modules/stakeholders/user-profile/user-profile.component';
import { RegistrationFormComponent } from './feature-modules/stakeholders/registration-form/registration-form.component';
import { CompanySearchComponent } from './feature-modules/stakeholders/company-search/company-search.component';
import { CompanyFormComponent } from './feature-modules/system-admin/company-form/company-form.component';
import { SystemAdminFormComponent } from './feature-modules/system-admin/system-admin-form/system-admin-form.component';
import { CompanyAdminFormComponent } from './feature-modules/system-admin/company-admin-form/company-admin-form.component';

const routes: Routes = [
  {
    path: 'user-profile',
    component: UserProfileComponent,
  },

  {
    path: 'registration',
    component: RegistrationFormComponent,
  },
  {
    path: 'company-search',
    component: CompanySearchComponent,
  },

  { path: 'company-form', component: CompanyFormComponent },
  { path: 'system-admin-form', component: SystemAdminFormComponent },
  { path: 'company-admin-form', component: CompanyAdminFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
