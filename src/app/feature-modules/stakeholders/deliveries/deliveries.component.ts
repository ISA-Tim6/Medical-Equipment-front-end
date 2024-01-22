import { Component, OnInit } from '@angular/core';
import { RegistratedUser } from '../model/user.model';
import { StakeholdersService } from '../stakeholders.service';
import { Reservation } from '../../company-profile/model/reservation.model';
import { Item } from '../../company-overview/model/item.model';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.css'],
})
export class DeliveriesComponent implements OnInit {
  user: RegistratedUser;
  sortType: string = '';
  deliveries: Reservation[] = [];
  constructor(private service: StakeholdersService) {}
  ngOnInit(): void {
    this.service.getUser().subscribe({
      next: (result: RegistratedUser) => {
        console.log(result);
        this.user = result;
        this.service
          .getAcceptedReservationsByUser(this.user.user_id!)
          .subscribe({
            next: (result: Reservation[]) => {
              this.deliveries = result;
            },
          });
      },
    });
  }
  calculateTotalPrice(items: Item[]): number {
    return items.reduce(
      (total, item) => total + this.calculateItemTotalPrice(item),
      0
    );
  }

  calculateItemTotalPrice(item: Item): number {
    return item.quantity * item.equipment.price;
  }
  sort(): void {
    switch (this.sortType) {
      case 'Date asc':
        this.deliveries.sort((a, b) => {
          const dateA = new Date(a.appointment.date);
          const dateB = new Date(b.appointment.date);
          return dateA.getTime() - dateB.getTime();
        });
        break;
      case 'Date desc':
        this.deliveries.sort((a, b) => {
          const dateA = new Date(a.appointment.date);
          const dateB = new Date(b.appointment.date);
          return dateB.getTime() - dateA.getTime();
        });
        break;
      case 'Price asc':
        this.deliveries.sort((a, b) => {
          const priceA = this.calculateTotalPrice(a.items);
          const priceB = this.calculateTotalPrice(b.items);
          return priceA - priceB;
        });
        break;
      case 'Price desc':
        this.deliveries.sort((a, b) => {
          const priceA = this.calculateTotalPrice(a.items);
          const priceB = this.calculateTotalPrice(b.items);
          return priceA - priceB;
        });
        this.deliveries.reverse();
        break;
    }
  }
  reset(): void {
    this.service.getAcceptedReservationsByUser(this.user.user_id!).subscribe({
      next: (result: Reservation[]) => {
        this.deliveries = result;
        this.sortType = '';
      },
    });
  }
}
