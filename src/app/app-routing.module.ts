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
import { HomePageComponent } from './feature-modules/home-page/home-page.component';
import { CompanyCalendarComponent } from './feature-modules/stakeholders/company-calendar/company-calendar.component';
import { CompanyAdminChangePasswordComponent } from './feature-modules/stakeholders/company-admin-change-password/company-admin-change-password.component';
import { SystemAdminHomePageComponent } from './feature-modules/system-admin/system-admin-home-page/system-admin-home-page.component';
import { ContractsComponent } from './feature-modules/stakeholders/contracts/contracts.component';
import { RegUserHomePageComponent } from './feature-modules/stakeholders/reg-user-home-page/reg-user-home-page.component';
import { QrComponent } from './feature-modules/stakeholders/qr/qr.component';
import { EquipmentDeliveryComponent } from './feature-modules/stakeholders/equipment-delivery/equipment-delivery.component';
import { UsersWithReservationsComponent } from './feature-modules/stakeholders/users-with-reservations/users-with-reservations.component';
import { DeliveriesComponent } from './feature-modules/stakeholders/deliveries/deliveries.component';
import { FutureAppointmentsComponent } from './feature-modules/stakeholders/future-appointments/future-appointments.component';
import { MapComponent } from './feature-modules/map/map.component';

import { LocationSimulatorComponent } from './feature-modules/location-simulator/location-simulator/location-simulator.component';

const routes: Routes = [
  {
    path: 'user-profile',
    component: UserProfileComponent,
  },

  { path: 'company-form', component: CompanyFormComponent },
  { path: 'system-admin-form', component: SystemAdminFormComponent },
  { path: 'company-admin-form', component: CompanyAdminFormComponent },

  {path: 'company-admin-password/:id',component: CompanyAdminChangePasswordComponent},
  {path: 'equipment-delivery/:id',component: EquipmentDeliveryComponent},
  { path: 'users-reservation', component:UsersWithReservationsComponent},
  {
    path: 'company-admin-password/:id',
    component: CompanyAdminChangePasswordComponent,
  },
  { path: 'contracts', component: ContractsComponent },

  { path: 'equipment-delivery/:id', component: EquipmentDeliveryComponent },

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
    path: 'companyProfile/:company_id/:user_id',
    component: CompanyOverviewComponent,
  },
  {
    path: 'companies',
    component: CompaniesOverviewComponent,
  },
  { path: 'equipment-search', component: EquipmentSearchComponent },
  {
    path: 'login',
    component: LoginFormComponent,
  },
  {
    path: 'home-page',
    component: HomePageComponent,
  },
  {
    path: 'company-calendar/:company_id',
    component: CompanyCalendarComponent,
  },
  {
    path: 'system-admin-home-page',
    component: SystemAdminHomePageComponent,
  },
  {
    path: 'reg-user-home-page',
    component: RegUserHomePageComponent,
  },
  {
    path: 'qr',
    component: QrComponent,
  },
  {
    path: 'my-deliveries',
    component: DeliveriesComponent,
  },
  {
    path: 'future-appointments',
    component: FutureAppointmentsComponent,
  },
  {
    path: 'map',
    component: MapComponent,
  },
  {
    path: 'location-simulator',
    component: LocationSimulatorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
