import { Component } from '@angular/core';
import { Equipment } from '../../company-profile/model/equipment.model';
import { SystemAdminService } from '../system-admin.service';

@Component({
  selector: 'app-equipment-search',
  templateUrl: './equipment-search.component.html',
  styleUrls: ['./equipment-search.component.css']
})
export class EquipmentSearchComponent {
  name: string;
  equipment: Equipment[]=[];

  constructor(private service: SystemAdminService){}

  onSearch(): void{
    this.service.searchEquipment(this.name).subscribe(result => {
      this.equipment = result;
    });
  }

}
