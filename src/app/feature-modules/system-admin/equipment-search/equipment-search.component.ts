import { Component } from '@angular/core';
import { Equipment } from '../../company-profile/model/equipment.model';
import { SystemAdminService } from '../system-admin.service';
import { LowerCasePipe } from '@angular/common';

@Component({
  selector: 'app-equipment-search',
  templateUrl: './equipment-search.component.html',
  styleUrls: ['./equipment-search.component.css']
})
export class EquipmentSearchComponent {
  name: string;
  equipment: Equipment[]=[];
  filterType: string;
  filterCompanyName: string;
  filterCompanyGradeFrom: number = 0;
  filterCompanyGradeTo: number = 10;

  constructor(private service: SystemAdminService){}

  onSearch(): void{
    this.service.searchEquipment(this.name).subscribe(result => {
      this.equipment = result;
    });
  }

  onFilter(): void{
    if(!this.filterType && !this.filterCompanyName && this.filterCompanyGradeFrom == 0 && this.filterCompanyGradeTo == 10)
    {
      this.service.searchEquipment(this.name).subscribe(result => {
        this.equipment = result;
      });
    }else
    if(this.filterType)
    {
      this.equipment = this.equipment.filter(n => n.type.toLowerCase().includes(this.filterType.toLowerCase()));
    }

    if(this.filterCompanyName)
    {
      let list: Equipment[] = [];
      this.equipment.forEach(e => {
        if( e.companies)
          e.companies.forEach(c => {
            if((c.name).toLowerCase().includes(this.filterCompanyName.toLowerCase()) && list.filter(n => n.equipment_id == e.equipment_id).length == 0)
            list.push(e);
          });
      });
      this.equipment = list;
    }

 
      let list: Equipment[] = [];
      this.equipment.forEach(e => {
        if( e.companies)
          e.companies.forEach(c => {
            if(c.averageGrade >= this.filterCompanyGradeFrom && c.averageGrade <= this.filterCompanyGradeTo  && list.filter(n => n.equipment_id == e.equipment_id).length == 0)
            list.push(e);
          });
      });
    this.equipment = list;
  }

  onReset(): void{
    this.service.searchEquipment(this.name).subscribe(result => {
      this.equipment = result;
    });
  }
}
