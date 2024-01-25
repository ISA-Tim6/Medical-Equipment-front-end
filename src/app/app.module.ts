import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StakeholdersModule } from './feature-modules/stakeholders/stakeholders.module';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SystemAdminModule } from './feature-modules/system-admin/system-admin.module';
import { CompanyProfileComponent } from './feature-modules/company-profile/company-profile.component';
import { CompaniesOverviewComponent } from './feature-modules/companies-overview/companies-overview.component';
import { CompanyOverviewComponent } from './feature-modules/company-overview/company-overview.component';
import { LoginFormComponent } from './feature-modules/login-form/login-form.component';
import { HomePageComponent } from './feature-modules/home-page/home-page.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptor/TokenInterceptor';
import { FooService } from './feature-modules/services/foo.service';
import { AuthService } from './auth/auth.service';
import { ApiService } from './feature-modules/services/api.service';
import { ConfigService } from './feature-modules/services/config.service';
import { UserService } from './feature-modules/services/user.service';
import { MapComponent } from './feature-modules/map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    CompanyProfileComponent,
    CompaniesOverviewComponent,
    CompanyOverviewComponent,
    LoginFormComponent,
    HomePageComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StakeholdersModule,
    ReactiveFormsModule,
    FormsModule,
    SystemAdminModule,
  ],
  exports: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    FooService,
    AuthService,
    ApiService,
    UserService,
    ConfigService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
