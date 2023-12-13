import { Component, OnInit } from '@angular/core';
import { Company } from '../company-profile/model/company.model';
import { CompanyService } from '../services/company.service';
import { ActivatedRoute } from '@angular/router';
import { Equipment } from '../company-profile/model/equipment.model';
import { Appointment } from '../company-profile/model/appointment.model';
import { Item } from './model/item.model';
import { Reservation } from '../company-profile/model/reservation.model';
import { RegistratedUser } from '../stakeholders/model/user.model';

@Component({
  selector: 'app-company-overview',
  templateUrl: './company-overview.component.html',
  styleUrls: ['./company-overview.component.css'],
})
export class CompanyOverviewComponent implements OnInit {
  id: number;
  user: RegistratedUser;
  company: Company;
  name: string;
  filterType: string;
  isShowCalendarClicked: boolean = false;
  isExtraTermClicked: boolean = false;
  item: Item;
  added: boolean = false;
  canAdd: boolean = false;
  currentDate = new Date();
  user_id: number;
  equipmentList: Equipment[] = [];
  chosenItemsList: Item[] = [];
  availableAppointments: Appointment[] = [];
  constructor(
    private service: CompanyService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['company_id'];
      this.user_id = params['user_id'];
      this.service.getCompany(this.id).subscribe({
        next: (result: Company) => {
          this.company = result;
          this.company.company_id = this.id;
          this.equipmentList = this.company.equipment || [];
          this.availableAppointments =
            this.company.workingTimeCalendar.appointments.filter(
              (a) => a.appointmentStatus == 'AVAILABLE'
            );
        },
      });
    });
  }

  onSearch(): void {
    this.service
      .searchEquipmentByCompany(this.name, this.company.company_id || 0)
      .subscribe((result) => {
        this.equipmentList = result;
      });
  }

  onFilter(): void {
    if (!this.filterType) {
      this.service
        .searchEquipmentByCompany(this.name, this.company.company_id || 0)
        .subscribe((result) => {
          this.equipmentList = result;
        });
    } else if (this.filterType) {
      this.equipmentList = this.equipmentList.filter((n) =>
        n.type.toLowerCase().includes(this.filterType.toLowerCase())
      );
    }
  }

  onReset(): void {
    this.service
      .searchEquipmentByCompany(this.name, this.company.company_id || 0)
      .subscribe((result) => {
        this.equipmentList = result;
      });
  }

  onChoose(equipment: Equipment): void {
    const item: Item = {
      equipment: equipment,
      quantity: 1,
    };
    this.added = false;
    this.canAdd = true;
    //ne zab da pormijenim quantity u equipmentu
    if (equipment.quantity > 0) {
      this.chosenItemsList.forEach((item1) => {
        if (item1.equipment.equipment_id == equipment.equipment_id) {
          item1.quantity += 1;

          if (equipment.quantity - item1.quantity >= 0) {
            this.canAdd = false;
            this.added = true;
          } else {
            item1.quantity -= 1;
            this.added = false;
            alert('Not enough equipment in this company.');
            this.canAdd = false;
          }
        }
      });
      if (!this.added && this.canAdd) {
        this.chosenItemsList.push(item);
      }
    } else {
      alert('Not enough equipment in this company.');
    }

    //sad napraviti rezervaciju i stavku, pa u tome azurirati equipment, ali ovo treba na reserve
  }
  onShowCalendar(): void {
    this.isShowCalendarClicked = true;
  }
  async onReserve(appointment: Appointment): Promise<void> {
    if (this.chosenItemsList.length > 0) {
      for (let item of this.chosenItemsList) {
        console.log(this.chosenItemsList.length);
        item.equipment.quantity -= item.quantity;
        //const retItem = await this.service.addItem(item); //prvo kreiraj itemse
        const retEquipment = await this.service.updateEquipment(item.equipment);
      }
      console.log(appointment);
      var reservation: Reservation = {
        user: this.user,
        items: [],
        appointment: appointment,
        //qr_code: 1,
        reservationStatus: 'NEW',
      };
      reservation.appointment = appointment;
      reservation.items = this.chosenItemsList;
      reservation.user = this.user;
      reservation.reservationStatus = 'NEW';
      const retReservation = await this.service.addReservation(reservation);
      appointment.appointmentStatus = 'RESERVED';

      const retAppointment = await this.service.updateAppointment(
        appointment,
        this.id,
        this.user_id
      );
      this.chosenItemsList = [];
      //samo available appoint
      this.availableAppointments.forEach((ap) => {
        if (ap.appointment_id == appointment.appointment_id) {
          ap.appointmentStatus = 'RESERVED';
        }
      });
      this.availableAppointments = this.availableAppointments.filter(
        (a) => a.appointmentStatus == 'AVAILABLE'
      );
      this.isShowCalendarClicked = false;
      //azurirati quantity u equpimentu
    } else {
      alert("You didn't choose equipment.");
    }
  }
  onExtraAppointment(): void {
    this.isExtraTermClicked = true;
  }
}
