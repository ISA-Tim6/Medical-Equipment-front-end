import { Component, OnInit} from '@angular/core';
import { StakeholdersService } from '../stakeholders.service';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from '../../company-profile/model/reservation.model';

@Component({
  selector: 'app-equipment-delivery',
  templateUrl: './equipment-delivery.component.html',
  styleUrls: ['./equipment-delivery.component.css']
})
export class EquipmentDeliveryComponent {

  constructor(
    private service: StakeholdersService,
    private activatedRoute: ActivatedRoute
  ) {}

  userId:number;
  reservations:Reservation[];

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params=>{
      this.userId=params['id'];

      this.service.getNewReservations(this.userId).subscribe({
        next: (result: Reservation[]) => {
        this.reservations=result;
        console.log(result);         
        }
      })
         
    })
  }

  OnDeliver(r:Reservation):void{
    this.service.deliverReservation(r.reservation_id||0).subscribe({
      next: (result: Reservation[]) => {
      this.reservations=result;
      console.log(result);         
      }
    })
  }

}
