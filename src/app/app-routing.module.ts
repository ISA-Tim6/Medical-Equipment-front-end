import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './feature-modules/stakeholders/user-profile/user-profile.component';
import { RegistrationFormComponent } from './feature-modules/stakeholders/registration-form/registration-form.component';

const routes: Routes = [
  {
    path: 'user-profile',
    component: UserProfileComponent,
  },
  {
    path: 'registration',
    component: RegistrationFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
