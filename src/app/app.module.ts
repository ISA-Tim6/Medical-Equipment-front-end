import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StakeholdersModule } from './feature-modules/stakeholders/stakeholders.module';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StakeholdersModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [AppComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
