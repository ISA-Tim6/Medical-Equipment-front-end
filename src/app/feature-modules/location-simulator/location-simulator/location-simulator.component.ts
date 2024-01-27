import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MapComponent } from '../../map/map.component';
import { LocationSimulatorService } from '../location-simulator.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/env/environment';

import {Stomp} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Location } from '../model/location.model';

@Component({
  selector: 'app-location-simulator',
  templateUrl: './location-simulator.component.html',
  styleUrls: ['./location-simulator.component.css']
})
export class LocationSimulatorComponent implements OnInit{
  @ViewChild(MapComponent) mapComponent: MapComponent;
  private serverUrl = 'ws://localhost:81/socket';
  private stompClient: any;

  isLoaded: boolean = false;
  isCustomSocketOpened = false;
  message: string = '';

  constructor(private service: LocationSimulatorService){}

  ngOnInit(): void {
    this.initializeWebSocketConnection();
  }

  sendMessage(): void{
    this.service.sendMessage().subscribe({});
  }

  // Funkcija za otvaranje konekcije sa serverom
  initializeWebSocketConnection() {
    // serverUrl je vrednost koju smo definisali u registerStompEndpoints() metodi na serveru
    let ws = new WebSocket(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;

    console.log("c");
    this.stompClient.connect({}, function () {
      console.log("Connection established!");
      that.isLoaded = true;
      that.openGlobalSocket()
    });
  }

  // Funkcija salje poruku na WebSockets endpoint na serveru
  sendMessageUsingSocket() {
    this.message = "start";

      // Primer slanja poruke preko web socketa sa klijenta. URL je 
      //  - ApplicationDestinationPrefix definisan u config klasi na serveru (configureMessageBroker() metoda) : /socket-subscriber
      //  - vrednost @MessageMapping anotacije iz kontrolera na serveru : /send/message
      this.stompClient.send("/socket-subscriber/send/message", {}, this.message);
    }


  // Funckija za pretplatu na topic /socket-publisher (definise se u configureMessageBroker() metodi)
  // Globalni socket se otvara prilikom inicijalizacije klijentske aplikacije
  openGlobalSocket() {
    if (this.isLoaded) {
      this.stompClient.subscribe("/socket-publisher", (message: { body: string; }) => {
        console.log("global socket");
        this.handleResult(message);
      });
    }
  }

  // Funkcija koja se poziva kada server posalje poruku na topic na koji se klijent pretplatio
  handleResult(message: { body: string; }) {
    if (message.body) {
      let location: Location = JSON.parse(message.body);
      this.drawPointOnMap(location);
    }
  }

  drawPointOnMap(location: Location): void{
    this.mapComponent.drawPoint(location.latitude, location.longitude);
  }

}
