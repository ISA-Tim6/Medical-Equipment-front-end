import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './feature-modules/stakeholders/user-profile/user-profile.component';
import { RegistrationFormComponent } from './feature-modules/stakeholders/registration-form/registration-form.component';
import { CompanyAdminProfileComponent } from './feature-modules/stakeholders/company-admin-profile/company-admin-profile.component';
import { CompanyProfileComponent } from './feature-modules/company-profile/company-profile.component';
import { CompaniesOverviewComponent } from './feature-modules/companies-overview/companies-overview.component';
import { CompanyOverviewComponent } from './feature-modules/company-overview/company-overview.component';
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
    path: 'company-admin-profile',
    component: CompanyAdminProfileComponent
  },
  {
    path:'company/:company_id/:user_id',
    component:CompanyProfileComponent
  },
  {
    path:'company/:company_id',
    component:CompanyOverviewComponent
  },
  {
    path:'companies',
    component:CompaniesOverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
