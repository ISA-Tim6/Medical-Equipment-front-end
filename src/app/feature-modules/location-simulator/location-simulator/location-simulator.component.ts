import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MapComponent } from '../../map/map.component';
import { LocationSimulatorService } from '../location-simulator.service';

@Component({
  selector: 'app-location-simulator',
  templateUrl: './location-simulator.component.html',
  styleUrls: ['./location-simulator.component.css']
})
export class LocationSimulatorComponent implements OnInit{
  @ViewChild(MapComponent) mapComponent: MapComponent;

  constructor(private service: LocationSimulatorService){}

  ngOnInit(): void {
  }

  sendMessage(): void{
    this.service.sendMessage().subscribe({});
  }
}
