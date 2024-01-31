import { Component, OnInit } from '@angular/core';
import { Company } from '../company-profile/model/company.model';
import { CompanyService } from '../services/company.service';
import { ActivatedRoute } from '@angular/router';
import { Equipment } from '../company-profile/model/equipment.model';
import { Appointment } from '../company-profile/model/appointment.model';
import { Item } from './model/item.model';
import { Reservation } from '../company-profile/model/reservation.model';
import { RegistratedUser } from '../stakeholders/model/user.model';
import { timeout } from 'rxjs';
import { StakeholdersService } from '../stakeholders/stakeholders.service';
import { AuthService } from '../services/auth.service';
import { CanceledAppointment } from '../company-profile/model/canceled-appointment.model';
import { Time } from '@angular/common';

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
  extraDate: Date;
  extraApp: Appointment = {
    appointment_id: 0,
    appointmentStatus: 'RESERVED',
    duration: 60,
    date: new Date(),
    time: '',
    end: '',
  };
  freeSlots: string[] = [];
  currentDate = new Date();
  user_id: number;
  equipmentList: Equipment[] = [];
  chosenItemsList: Item[] = [];
  availableAppointments: Appointment[] = [];
  availableUserAppointments: Appointment[] = [];
  canceledAppointments: CanceledAppointment[] = [];
  constructor(
    private service: CompanyService,
    private activatedRoute: ActivatedRoute,
    private stakeholderService: StakeholdersService,
    private authService: AuthService
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
              (a) =>
                a.appointmentStatus == 'AVAILABLE' &&
                new Date(a.date).getDate >= new Date().getDate
            );

          /*for (let c of this.company.workingTimeCalendar.appointments)
            console.log(new Date(c.date + 'T' + c.time));*/

          this.availableUserAppointments = this.availableAppointments;
          this.stakeholderService.getUser().subscribe({
            next: (result: RegistratedUser) => {
              this.user = result;
              this.stakeholderService
                .getCanceledAppointments(this.user.user_id as number)
                .subscribe({
                  next: (result: any) => {
                    this.canceledAppointments = result;
                    for (let a of this.canceledAppointments) {
                      this.availableUserAppointments =
                        this.availableUserAppointments.filter(
                          (c) => c.appointment_id != a.appointmentId
                        );
                    }
                  },
                });
            },
          });
        },
      });
    });
  }

  isRegisteredUser(): boolean {
    const userRoles = this.authService.getUserRoles();
    return userRoles !== null && userRoles.includes('ROLE_REGISTRATED_USER');
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
    /*this.service
      .searchEquipmentByCompany(this.name, this.company.company_id || 0)
      .subscribe((result) => {
        this.equipmentList = result;
      });*/
    this.service.getCompany(this.id).subscribe({
      next: (result: Company) => {
        this.company = result;
        this.company.company_id = this.id;
        this.equipmentList = this.company.equipment || [];
      },
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
        alert('Successfully added item.');
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
    if (this.user.penals! >= 3) alert("You have 3 penals, can't reserve!");
    else {
      if (this.chosenItemsList.length > 0) {
        for (let item of this.chosenItemsList) {
          console.log(this.chosenItemsList.length);
          //item.equipment.quantity -= item.quantity;
          //const retItem = await this.service.addItem(item); //prvo kreiraj itemse
          const retEquipment = await this.service.updateEquipment(
            item.equipment
          );
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
        const retReservation = await this.service.addReservation(
          reservation,
          this.user.penals!
        );

        if (retReservation == null)
          alert("Can't reserve."); //ovo vraca i za konflikt i za penals
        else {
          appointment.appointmentStatus = 'RESERVED';

          const retAppointment = await this.service.updateAppointment(
            appointment,
            this.id,
            appointment.admin?.id || 0
          );
          if ((retAppointment as number) > 0) {
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
            alert('Sucessfully reserved!');
          }
        }
      } else {
        alert("You didn't choose equipment.");
      }
    }
  }
  onExtraAppointment(): void {
    this.isExtraTermClicked = true;
  }
  onFindFreeSlots(): void {
    if (this.extraDate) {
      this.service
        .findFreeSlots(this.company.company_id!, this.extraDate.toString())
        .subscribe((result) => {
          this.freeSlots = result;
        });
    } else alert('Please enter date.');
  }
  async onCreateExtraTerm(term: string): Promise<void> {
    //
    if (this.user.penals! >= 3) alert("You have 3 penals, can't reserve!");
    else {
      if (this.extraDate) {
        const appointment: Appointment = {
          date: new Date(this.extraDate),
          time: term || '',
          duration: 60,
          appointmentStatus: 'RESERVED',
        };
        const appId = await this.service.addExtraordinaryAppointment(
          appointment,
          this.id
        );
        console.log(appId);
        if ((appId as number) > 0) {
          //alert('Sucessfully reserved extra-term!');
          this.isShowCalendarClicked = false;
          this.freeSlots = [];

          for (let item of this.chosenItemsList) {
            console.log(this.chosenItemsList.length);
            //item.equipment.quantity -= item.quantity;
            //const retItem = await this.service.addItem(item); //prvo kreiraj itemse
            const retEquipment = await this.service.updateEquipment(
              item.equipment
            );
          }
          this.extraApp.appointment_id = appId;
          var reservation: Reservation = {
            user: this.user,
            items: [],
            appointment: this.extraApp,
            //qr_code: 1,
            reservationStatus: 'NEW',
          };
          reservation.appointment = this.extraApp;
          reservation.items = this.chosenItemsList;
          reservation.user = this.user;
          reservation.reservationStatus = 'NEW';
          const retReservation = await this.service.addReservation(
            reservation,
            this.user.penals!
          );

          if (retReservation == null)
            alert("You can't reserve!");
          else {
            this.isShowCalendarClicked = false;
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

            //azurirati quantity u equpimentu
            this.chosenItemsList = [];
            alert('Sucessfully reserved!');
          }
        }
      }
    }
  }
}
