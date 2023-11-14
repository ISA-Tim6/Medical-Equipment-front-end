import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StakeholdersModule } from './feature-modules/stakeholders/stakeholders.module';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SystemAdminModule } from './feature-modules/system-admin/system-admin.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StakeholdersModule,
    ReactiveFormsModule,
    FormsModule,
    SystemAdminModule
  ],
  exports: [AppComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
