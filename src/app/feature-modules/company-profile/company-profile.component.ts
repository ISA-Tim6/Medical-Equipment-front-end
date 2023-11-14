import { Component,OnInit } from '@angular/core';
import { CompanyService } from '../services/company.service';
import { Router } from '@angular/router';
import { Company } from './model/company.model';
import { Address } from './model/address.model';
import { Equipment } from './model/equipment.model';
import { CompanyAdmin } from '../stakeholders/model/company-admin.model';
import { ActivatedRoute } from '@angular/router';
import { FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit{

  constructor(private service: CompanyService,private activatedRoute:ActivatedRoute) {
  }

  edit:string="Edit";
  id:number=0;
  user_id:number;
  company:Company;
  disabledStatus:Boolean=true;
  equipmentFormVisible:Boolean=false;
  admins:CompanyAdmin[];
  equipment:Equipment={
    name:"",
    description:"",
    type:"",
    equipment_id:0
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.id=params['company_id'];
      this.user_id=params['user_id'];
    this.service.getCompany(this.id).subscribe({
      next: (result: Company) => {
        this.company = result;
        this.company.company_id=this.id;

        this.service.getOtherCompanyAdminsForCompany(this.id,this.user_id).subscribe({
          next:(result:CompanyAdmin[])=>{
            this.admins=result;
          }
        })
      },
    });
  })}
  equipmentForm= new FormGroup({
    name: new FormControl('',[Validators.required]),
     description: new FormControl('',[Validators.required]),
     type: new FormControl('',[Validators.required])
   })

  OnPlus():void{
    this.equipmentFormVisible=!this.equipmentFormVisible;
  }
  OnMinus(equipment:Equipment):void{

    this.service.removeEquipment(equipment,this.id).subscribe({
      next: (result: Company) => {
        this.company = result;
        this.company.company_id=this.id;
      },
    });
  }

  OnConfirm():void{
     let equipment:Equipment={
      name:this.equipmentForm.value.name||"",
      description:this.equipmentForm.value.description||"",
      type:this.equipmentForm.value.type||""
    }

    this.service.addEquipment(equipment,this.id).subscribe({
      next: (result: Company) => {
        this.company = result;
        this.company.company_id=this.id;
      },
    });
  }

  OnEdit():void{
    this.disabledStatus=!this.disabledStatus;
    if(this.edit=="Edit"){
      this.edit="Confirm";
    }else{
      this.edit="Edit";
      this.company.company_id=this.id;
      this.service.updateCompany(this.company).subscribe({
        next: (result: Company) => {
          this.company = result;
          this.company.company_id=this.id;
        },
      });
    }
  }

    


}
