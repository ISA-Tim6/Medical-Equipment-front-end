import { Component, OnInit} from '@angular/core';
import { StakeholdersService } from '../stakeholders.service';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from '../../company-profile/model/reservation.model';
import { CompanyAdmin } from '../model/company-admin.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipment-delivery',
  templateUrl: './equipment-delivery.component.html',
  styleUrls: ['./equipment-delivery.component.css']
})
export class EquipmentDeliveryComponent {

  constructor(
    private service: StakeholdersService,
    private activatedRoute: ActivatedRoute,private router: Router
  ) {}

  userId:number;
  reservations:Reservation;
  companyAdmin:CompanyAdmin;

  ngOnInit(): void {


    this.service.getCompanyAdmin().subscribe({
      next: (result: CompanyAdmin) => {
        console.log(result);
        this.companyAdmin=result;
        this.userId=this.companyAdmin.id;

        if(this.companyAdmin.loggedBefore==false){
          this.router.navigate([`company-admin-password/${this.userId}`]);
        }

        this.service.getNewReservations(this.userId).subscribe({
          next: (result: Reservation) => {
          this.reservations=result;
          console.log(result);         
          }
        })
      },
    });
    
  /*  this.activatedRoute.params.subscribe(params=>{
      this.userId=params['id'];

      this.service.getNewReservations(this.userId).subscribe({
        next: (result: Reservation) => {
        this.reservations=result;
        console.log(result);         
        }
      })
         
    })*/
  }

  OnDeliver(r:Reservation):void{
    this.service.deliverReservation(r.reservation_id||0).subscribe({
      next: (result: Reservation) => {
      this.reservations=result;
      console.log(result);         
      }
    })
  }

}
