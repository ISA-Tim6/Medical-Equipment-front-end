import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationSimulatorComponent } from './location-simulator/location-simulator.component';
import { MapComponent } from '../map/map.component';
import { RouterModule } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AppModule } from 'src/app/app.module';



@NgModule({
  declarations: [
    LocationSimulatorComponent
  ],
  imports: [
    CommonModule, AppModule
  ]
})
export class LocationSimulatorModule { }
