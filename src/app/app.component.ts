import { Component } from '@angular/core';
import { AppService } from './app.service';
import { OnInit } from 'MedicalEquipment/@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'MedicalEquipment';
  lista: number = 0;

  constructor(private service: AppService) {}
  ngOnInit(): void {
    this.get();
  }

  get(): void {
    this.service.getTourPreference().subscribe({
      next: (result: number) => {
        this.lista = result;
      },
    });
  }
}
