import { Component } from '@angular/core';
import { OnInit } from 'MedicalEquipment/@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'MedicalEquipment';

  constructor() {}

  ngOnInit(): void {}
}
