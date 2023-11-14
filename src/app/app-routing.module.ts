import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './feature-modules/stakeholders/user-profile/user-profile.component';
import { RegistrationFormComponent } from './feature-modules/stakeholders/registration-form/registration-form.component';
import { CompanySearchComponent } from './feature-modules/stakeholders/company-search/company-search.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
