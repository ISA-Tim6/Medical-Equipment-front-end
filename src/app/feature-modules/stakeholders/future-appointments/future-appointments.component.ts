import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../company-profile/model/appointment.model';
import { StakeholdersService } from '../stakeholders.service';
import { RegistratedUser } from '../model/user.model';
import { Reservation } from '../../company-profile/model/reservation.model';
import { CompanyService } from '../../services/company.service';
import { Observable } from 'rxjs';
import { Company } from '../../company-profile/model/company.model';

@Component({
  selector: 'app-future-appointments',
  templateUrl: './future-appointments.component.html',
  styleUrls: ['./future-appointments.component.css'],
})
export class FutureAppointmentsComponent implements OnInit {
  reservations: Appointment[] = [];
  user: RegistratedUser;
  companies: Company[] = [];
  id: number;
  constructor(
    private service: StakeholdersService,
    private companyService: CompanyService
  ) {}
  ngOnInit(): void {
    this.service.getUser().subscribe({
      next: (result: RegistratedUser) => {
        console.log(result);
        this.user = result;
        this.service
          .getAllFutureReservations(this.user.user_id as number)
          .subscribe({
            next: (result: Appointment[]) => {
              this.reservations = result;
            },
          });
      },
    });
  }
  onCancel(a: Appointment) {
    this.service
      .cancelAppointment(a.appointment_id as number)
      .subscribe((response: boolean) => {
        console.log('Termin uspješno otkazan.');
        alert('Successfully cancelled.');

        a.appointmentStatus = 'AVAILABLE';
        this.service
          .getAllFutureReservations(this.user.user_id as number)
          .subscribe({
            next: (result: Appointment[]) => {
              this.reservations = result;
              location.reload();
            },
          });
      });
  }
}
