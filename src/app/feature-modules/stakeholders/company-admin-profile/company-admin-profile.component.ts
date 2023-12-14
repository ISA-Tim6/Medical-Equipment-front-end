import { Component,OnInit } from '@angular/core';
import { CompanyAdmin } from '../model/company-admin.model';
import { CompanyAdminService } from '../../services/company-admin.service';
import { Router } from '@angular/router';
import { UserCompanyAdmin } from '../model/user-company-admin.model';
import { User } from '../model/main-user.model';
import { StakeholdersService } from '../stakeholders.service';
import { RegistratedUser } from '../model/user.model';

@Component({
  selector: 'app-company-admin-profile',
  templateUrl: './company-admin-profile.component.html',
  styleUrls: ['./company-admin-profile.component.css']
})
export class CompanyAdminProfileComponent implements OnInit{
  selected: any;

  constructor(private service: CompanyAdminService ,private router: Router, private stakeHolderService: StakeholdersService) {}
  user:User;
  edit:string="Edit";
  disabledStatus:Boolean=true;
  id:number=2;
  companyAdmin:CompanyAdmin={
    id:0,
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
  ngOnInit(): void {
    this.stakeHolderService.getCompanyAdmin().subscribe({
      next: (result: CompanyAdmin) => {
        console.log(result);
        this.companyAdmin=result;
        this.id=this.companyAdmin.id;
        console.log(this.id);
        /*this.service.getCompanyAdmin(this.id).subscribe({
          next: (result: CompanyAdmin) => {
            console.log(result);
            this.companyAdmin = result;
            this.companyAdmin.user_id=this.id;
          },
        });*/
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
        user_id: this.companyAdmin.id,
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
      if(this.isAllValid()){
        let moze:Boolean=false;
        this.service.getUserByUsername(this.companyAdmin.username).subscribe({
          next: (result: number) => {
           if(result==-1 || result==this.companyAdmin.id)
            {
              
              this.service.getUserByEmail(this.companyAdmin.email).subscribe({
                next:(result:number)=>{
                  if(result==-1 || result==this.companyAdmin.id){
                    this.service.updateCompanyAdmin(companyAdminUser).subscribe({
                      next: (result: CompanyAdmin) => {
                        console.log(result);
                        this.companyAdmin = result;
                        this.companyAdmin.id=this.id;
                        alert("Your profile is changed!")
                        this.disabledStatus=true;
                        this.edit="Edit";
                      },
                    });
                  }else{
                    alert("Email is already in use");
                  }
                }
              });

               
            }else{
             alert("Username is already in use");
            }
          }
        });



  

  
  }
      
    }

  }

  onSeeCompanyProfile():void{
    this.router.navigate([`company/${this.companyAdmin.company_id}/${this.id}`]);

  }

  public isValidName(){
    let sampleRegEx: RegExp = /[A-Z][A-Za-z]+/;
    return sampleRegEx.test(this.companyAdmin.name);
  }

  public isValidSurname(){
    let sampleRegEx: RegExp = /[A-Z][A-Za-z]+/;
    return sampleRegEx.test(this.companyAdmin.surname);
  }

  public isValidEmail() {
    let sampleRegEx: RegExp =
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return sampleRegEx.test(this.companyAdmin.email);
  }

  public isLongPassword() {
    let isLong: boolean = false;
    if (this.companyAdmin.password.length >= 5) isLong = true;

    return isLong;
  }

  public isUsernameValid(){
    if (this.companyAdmin.username!="")
      return true;
    else
      return false;
  }

  public isUsernameAlreadyInUse(){
    this.service.getUserByUsername(this.companyAdmin.username).subscribe({
      next: (result: User) => {
        let u=result;
       if(result==null && (u.user_id!=this.companyAdmin.id))
        {
          alert("Username is already in use");
          return false;
        }else{
          return true;
        }
      }
    });
  }

  public isEmailAlreadyInUse(){
    this.service.getUserByEmail(this.companyAdmin.email).subscribe({
      next: (result: User) => {
        let u=result;
       if(result==null && (u.user_id!=this.companyAdmin.id))
        {
          alert("Email is already in use");
          return false;
        }else{
          return true;
        }
      }
    });
  }

  isPhoneNumberValid(){
    let isValidPhoneNumber:boolean=false;
    let sampleRegEx: RegExp = /[0-9]+/;
    if(sampleRegEx.test(this.companyAdmin.phoneNumber))
      if(this.companyAdmin.phoneNumber.length>3)
        isValidPhoneNumber=true;

    return isValidPhoneNumber;
  }



  isAllValid(){
    return this.isValidName()&& this.isValidSurname()&& this.isUsernameValid() && this.isLongPassword()
    && this.isPhoneNumberValid() && this.isValidEmail();
  }

}
