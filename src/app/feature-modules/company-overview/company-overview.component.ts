import { Component, OnInit } from '@angular/core';
import { Company } from '../company-profile/model/company.model';
import { CompanyService } from '../services/company.service';
import { ActivatedRoute } from '@angular/router';
import { Equipment } from '../company-profile/model/equipment.model';
import { Appointment } from '../company-profile/model/appointment.model';

@Component({
  selector: 'app-company-overview',
  templateUrl: './company-overview.component.html',
  styleUrls: ['./company-overview.component.css'],
})
export class CompanyOverviewComponent implements OnInit {
  id: number;
  company: Company;
  name: string;
  filterType: string;
  isShowCalendarClicked: boolean = false;
  equipmentList: Equipment[] = [];
  chosenEquipmentList: Equipment[] = [];
  availableAppointments: Appointment[] = [];
  constructor(
    private service: CompanyService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['company_id'];
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
    this.chosenEquipmentList.push(equipment);
  }
  onShowCalendar(): void {
    this.isShowCalendarClicked = true;
  }
  onReserve(appointment: Appointment): void {}
}
