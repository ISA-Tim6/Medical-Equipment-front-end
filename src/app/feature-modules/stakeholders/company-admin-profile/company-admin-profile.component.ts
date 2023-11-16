import { Component,OnInit } from '@angular/core';
import { CompanyAdmin } from '../model/company-admin.model';
import { CompanyAdminService } from '../../services/company-admin.service';
import { Router } from '@angular/router';
import { UserCompanyAdmin } from '../model/user-company-admin.model';

@Component({
  selector: 'app-company-admin-profile',
  templateUrl: './company-admin-profile.component.html',
  styleUrls: ['./company-admin-profile.component.css']
})
export class CompanyAdminProfileComponent implements OnInit{

  constructor(private service: CompanyAdminService ,private router: Router) {}

  edit:string="Edit";
  disabledStatus:Boolean=true;
  id:number=2;
  companyAdmin:CompanyAdmin={
    user_id:0,
    email: '',
    password: '',
    name: '',
    username: '',
    surname: '',
    city: '',
    country: '',
    phoneNumber: '',
    employment: 0,
    infoAboutInstitution: '',
    loggedBefore: false,
    company_id:1
  };

  invalidName:Boolean=false;
  invalidSurname:Boolean=false;
  invalidEmail:Boolean=false;
  invalidUsername:Boolean=false;
  invalidPassword:Boolean=false;
  invalidCity:Boolean=false;
  invalidCountry:Boolean=false;
  invalidPhoneNumber:Boolean=false;

  ngOnInit(): void {
    this.service.getCompanyAdmin(this.id).subscribe({
      next: (result: CompanyAdmin) => {
        console.log(result);
        this.companyAdmin = result;
        this.companyAdmin.user_id=this.id;
      },
    });
  }

  updateUser():void{
    if(this.disabledStatus==true){
      this.disabledStatus=false;
      this.edit="Confirm";
      return;
    }else
    {
      let companyAdminUser:UserCompanyAdmin={
        user_id: this.companyAdmin.user_id,
        email: this.companyAdmin.email,
        username: this.companyAdmin.username,
        password: this.companyAdmin.password,
        name: this.companyAdmin.name,
        surname: this.companyAdmin.surname,
        city: this.companyAdmin.city,
        country: this.companyAdmin.country,
        phoneNumber: this.companyAdmin.phoneNumber,
        employment: this.companyAdmin.employment,
        infoAboutInstitution: this.companyAdmin.infoAboutInstitution,
        loggedBefore: this.companyAdmin.loggedBefore
      }
    this.service.updateCompanyAdmin(companyAdminUser).subscribe({
      next: (result: CompanyAdmin) => {
        console.log(result);
        this.companyAdmin = result;
        this.companyAdmin.user_id=this.id;
        alert("Your profile is changed!")
        this.disabledStatus=true;
        this.edit="Edit";
      },
    });
      
    }

  }

  onSeeCompanyProfile():void{
    this.router.navigate([`company/${this.companyAdmin.company_id}/${this.id}`]);

  }

}
