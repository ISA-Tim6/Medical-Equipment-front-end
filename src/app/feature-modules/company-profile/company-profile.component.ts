import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../services/company.service';
import { Router } from '@angular/router';
import { Company } from './model/company.model';
import { Address } from './model/address.model';
import { Equipment } from './model/equipment.model';
import { CompanyAdmin } from '../stakeholders/model/company-admin.model';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EquipmentSearchComponent } from '../system-admin/equipment-search/equipment-search.component';
import { Appointment } from './model/appointment.model';
import { StakeholdersService } from '../stakeholders/stakeholders.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css'],
})
export class CompanyProfileComponent implements OnInit {
  constructor(
    private service: CompanyService,
    private activatedRoute: ActivatedRoute,
    private stakeholderService: StakeholdersService,
    private router:Router
  ) {}

  edit: string = 'Edit';
  id: number = 0;
  user_id: number;
  company: Company;
  disabledStatus: Boolean = true;
  equipmentFormVisible: Boolean = false;
  appointmentFormVisible: Boolean = false;
  admins: CompanyAdmin[];
  companyAdmin:CompanyAdmin;

  minTime:string;
  maxTime:string;
  equipmentEdit:Boolean=false;
  updatingEquipmentId:number=0;
  equipment:Equipment={
    name:"",
    description:"",
    type:"",
    equipment_id:0,
    price:0,
    quantity:0
  };
  currentDate = new Date();

  appointmentForm = new FormGroup({
    time: new FormControl('', [Validators.required]),
    date: new FormControl(),
  });

  name: string;
  filterType: string;
  equipmentList: Equipment[] = [];

  ngOnInit(): void {
    this.stakeholderService.getCompanyAdmin().subscribe({
      next: (result: CompanyAdmin) => {
        console.log(result);
        this.companyAdmin=result;
        this.user_id=this.companyAdmin.id;
        this.id=this.companyAdmin.company_id;

        if(this.companyAdmin.loggedBefore==false){
          this.router.navigate([`company-admin-password/${this.user_id}`]);
        }

        this.service.getCompany(this.id).subscribe({
          next: (result: Company) => {
            this.company = result;
            this.company.company_id=this.id;
            this.equipmentList = this.company.equipment || [];
            this.minTime=result.openingHours
            this.maxTime=result.closingHours;
            
    
            this.service.getOtherCompanyAdminsForCompany(this.id,this.user_id).subscribe({
              next:(result:CompanyAdmin[])=>{
                this.admins=result;
              }
            })
          },
        });
        
      },
    });




   /* this.activatedRoute.params.subscribe(params=>{
      this.id=params['company_id'];
      this.user_id=params['user_id'];
    this.service.getCompany(this.id).subscribe({
      next: (result: Company) => {
        this.company = result;
        this.company.company_id=this.id;
        this.equipmentList = this.company.equipment || [];
        this.minTime=result.openingHours
        this.maxTime=result.closingHours;
        

        this.service.getOtherCompanyAdminsForCompany(this.id,this.user_id).subscribe({
          next:(result:CompanyAdmin[])=>{
            this.admins=result;
          }
        })
      },
    });
  })*/
}

  equipmentForm= new FormGroup({
    name: new FormControl('',[Validators.required]),
     description: new FormControl('',[Validators.required]),
     type: new FormControl('',[Validators.required]),
     price:new FormControl(0,[Validators.required]),
     quantity:new FormControl(0,[Validators.required])
   });

  OnPlus():void{
    this.equipmentFormVisible=!this.equipmentFormVisible;
    this.equipmentForm.reset;
  }

  OnMinus(equipment:Equipment):void{

    this.service.removeEquipment(equipment,this.id).subscribe({
      next: (result: Company) => {
        if(result!=null)
        {
          this.company = result;
          this.company.company_id=this.id;
        }else{
          alert("Equipment can't be removed because there are reservations for it")
        }
      },
    });
  }

  OnConfirm():void{
     let equipment:Equipment={
      name:this.equipmentForm.value.name||"",
      description:this.equipmentForm.value.description||"",
      type:this.equipmentForm.value.type||"",
      price:this.equipmentForm.value.price||0,
      quantity:this.equipmentForm.value.quantity||0
    }

    if(this.equipmentEdit==false){
      if(this.isValidEquipmentName() && this.isValidEquipmentDescription() && this.isValidEquipmentType()){
      this.service.addEquipment(equipment,this.id).subscribe({
        next: (result: Company) => {
          this.company = result;
          this.company.company_id=this.id;
          this.equipmentFormVisible=!this.equipmentFormVisible;
          this.equipmentForm.reset();
        },
      });
    }
  }

  if(this.equipmentEdit==true){
    if(this.isValidEquipmentName() && this.isValidEquipmentDescription() && this.isValidEquipmentType()){
      this.service.updateEquipmentWithId(equipment,this.updatingEquipmentId).subscribe({
        next: (result: Equipment) => {
          this.service.getCompany(this.id).subscribe({
            next: (result: Company) => {
              this.company = result;
              this.company.company_id=this.id;
              this.equipmentList = this.company.equipment || [];
              this.equipmentEdit=false;
              this.equipmentForm.reset();
            },
          });
        },
      });
    }
  }

  }

  OnEdit():void{
    this.disabledStatus=!this.disabledStatus;
    if(this.edit=="Edit"){
      this.edit="Confirm";
    }else{
      if(this.isValidName()){
      this.edit="Edit";
      this.company.company_id=this.id;
      this.service.updateCompany(this.company).subscribe({
        next: (result: Company) => {
          this.company = result;
          this.company.company_id = this.id;
          this.equipmentList = this.company.equipment || [];

          this.service
            .getOtherCompanyAdminsForCompany(this.id, this.user_id)
            .subscribe({
              next: (result: CompanyAdmin[]) => {
                this.admins = result;
              },
            });
        },
      });
    }
    }
  }

  isValidName() {
    return this.company.name != '';
  }

  isValidEquipmentName() {
    return this.equipmentForm.value.name != '';
  }
  isValidEquipmentDescription() {
    return this.equipmentForm.value.description != '';
  }
  isValidEquipmentType() {
    return this.equipmentForm.value.type != '';
  }

  isValidEquipmentPrice() {
    return this.equipmentForm.value.price || 0 >= 1;
  }

  isValidEquipmentQuantity() {
    return this.equipmentForm.value.quantity || 0 >= 1;
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

  onConfirmAppointment(): void {
    const appointment: Appointment = {
      date: this.appointmentForm.value.date,
      time: this.appointmentForm.value.time || '',
      duration: 60,
    };
    this.service
      .addAppointment(appointment, this.id, this.user_id)
      .subscribe((result) => {
        if (result == 2) {
          this.service.getCompany(this.id).subscribe({
            next: (result: Company) => {
              this.company = result;
              this.equipmentList = this.company.equipment || [];
            },
          });
        } else if (result == 1) {
          alert('Outside working hours!');
        } else if (result == 0) {
          alert('There is overlap between appointments');
        }
      });
  }

  onAppointmentPlus(): void {
    this.appointmentForm.reset();
    this.appointmentFormVisible = !this.appointmentFormVisible;
  }
  OnEquipmentUpdate(e:Equipment,equipment_id:number):void{
    this.updatingEquipmentId=equipment_id;
    this.equipmentEdit=true;
    this.equipmentFormVisible=true;
    this.equipmentForm.patchValue(e);
  }
}
