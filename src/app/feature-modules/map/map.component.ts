import { Component, OnInit, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { MapService } from './map.service';
import { LocationResponse } from './model/location-response';
import { Observable, Observer, catchError, map, of, tap } from 'rxjs';

@Component({
  selector: 'xp-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  @Output() mapClick: EventEmitter<any> = new EventEmitter();
  @Input() initialCenter: [number, number] = [45.2396, 19.8227];
  @Input() initialZoom: number = 13
  
  private map: any;
  private routeControl: any;
  constructor(private mapService: MapService) { }

  private initMap(): void {
    this.map = L.map('map', {
      center: this.initialCenter,
      zoom: this.initialZoom,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    tiles.addTo(this.map);
    this.registerOnClick();
  }

  ngAfterViewInit(): void {
    let DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    this.initMap();
  }

  registerOnClick(): void {

    this.map.on('click', (e: any) => {
      const coord = e.latlng;
      const lat = coord.lat;
      const lng = coord.lng;
      console.log(
        'You clicked the map at latitude: ' + lat + ' and longitude: ' + lng
      );
      L.marker([lat, lng])
          .addTo(this.map)
          .bindPopup("point").openPopup();
      this.mapClick.emit({ lat, lon: lng });
    });
  }

  search(street: string): Observable<LocationResponse> {
    this.map.eachLayer((layer: any) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });
    return this.mapService.search(street).pipe(
      map((result) => result[0]),
      tap((location) => {
        console.log('Location:', location);
        L.marker([location.lat, location.lon])
          .addTo(this.map)
          .bindPopup(location.display_name)
          .openPopup();
      }),
      catchError((error) => {
        console.error('Error in search:', error);
        throw error;
      })
    );
  }

  reverseSearch(lat: number, lon: number): Observable<LocationResponse> {
    this.map.eachLayer((layer: any) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });
    return this.mapService.reverseSearch(lat, lon).pipe(
      map((result) => result),
      tap((location) => {
        console.log('Location:', location);
       L.marker([location.lat, location.lon])
          .addTo(this.map)
          .bindPopup(location.display_name)
          .openPopup();
      }),
      catchError((error) => {
        console.error('Error in reverse search:', error);
        throw error;
      })
    );
  }
  
  drawPoint(longitude: number, latitude: number): void{
    var greenIcon = L.icon({
      iconUrl: 'https://cdn.icon-icons.com/icons2/321/PNG/512/Circle_34541.png',
  
      iconSize:     [10, 15], // size of the icon
      shadowSize:   [50, 64], // size of the shadow
      iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
     });
    L.marker([latitude, longitude], {icon: greenIcon})
    .addTo(this.map);
    
  }
}
