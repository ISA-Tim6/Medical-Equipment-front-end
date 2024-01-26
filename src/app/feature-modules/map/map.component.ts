import { Component, OnInit, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { MapService } from './map.service';
import { LocationResponse } from './model/location-response';
import { Observable, Observer, catchError, map, of, tap } from 'rxjs';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Point } from 'ol/geom';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import Feature from 'ol/Feature';
import TileLayer from 'ol/layer/Tile';
import { View } from 'ol';
import Style from 'ol/style/Style';
import { fromLonLat } from 'ol/proj';
import Map from 'ol/Map';

@Component({
  selector: 'xp-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  @Output() mapClick: EventEmitter<any> = new EventEmitter();
  @Input() initialCenter: [number, number] = [45.2396, 19.8227];
  @Input() initialZoom: number = 13
  eventSource?: EventSource;
  
  vectorLayer?: VectorLayer<VectorSource>;
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
  //ngOnInit(): void {
    /*this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: olProj.fromLonLat([0, 0]),
        zoom: 2
      })
    });
    console.log("uslo");
    this.vectorLayer = new VectorLayer({
      source: new VectorSource()
    });

    if (this.map && this.vectorLayer) {
      this.map.addLayer(this.vectorLayer);

      this.eventSource = new EventSource('http://localhost:82/api/events');
      this.eventSource.onmessage = (event) => {
        console.log(event.data);

        const data = event.data;
        const tokens = data.split(',')
        const latitudeStr = tokens[0];
        const longitudeStr = tokens[1];
        console.log(latitudeStr, longitudeStr);
        if (latitudeStr && longitudeStr) {
          const latitude = parseFloat(latitudeStr);
          const longitude = parseFloat(longitudeStr);
          if(latitude === -1 && longitude === -1){
            this.vectorLayer?.getSource()?.clear();
          }
          
          const point = new Point(olProj.fromLonLat([longitude, latitude]));
          const feature = new Feature({
            geometry: point
          });
          
          if(latitude === -1 && longitude === -1){
            this.vectorLayer?.getSource()?.clear();
          }
          else if (this.vectorLayer?.getSource()) {
            this.vectorLayer?.getSource()?.addFeature(feature);
          }
        }
      };
    }*/
  //}
  
  
}
