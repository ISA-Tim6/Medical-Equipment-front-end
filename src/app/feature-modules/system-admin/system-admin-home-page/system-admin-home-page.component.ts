import { Component, OnInit } from '@angular/core';
import { SystemAdminService } from '../system-admin.service';
import { StakeholdersService } from '../../stakeholders/stakeholders.service';
import { User } from '../../stakeholders/model/main-user.model';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-system-admin-home-page',
  templateUrl: './system-admin-home-page.component.html',
  styleUrls: ['./system-admin-home-page.component.css']
})
export class SystemAdminHomePageComponent implements OnInit{

  systemAdmin: User;
  newPassword: string;
  repeatedPassword: string;
  changePassword: boolean;
  constructor(private servise: SystemAdminService, private userService: StakeholdersService, private router: Router){}

  ngOnInit(): void {
    this.changePassword = false;
    this.userService.getSystemAdmin().subscribe(result => {
      this.systemAdmin = result;
    });
  }

  isLongPassword() {
    let isLong: boolean = false;
    if (this.newPassword.length >= 5) isLong = true;

    return isLong;
  }

  isRepetedPasswodCorrect(){
    return this.newPassword==this.repeatedPassword;
  }

  OnConfirm():void{
    if(this.isLongPassword() && this.isRepetedPasswodCorrect())
    {
      this.servise.changePassword(this.systemAdmin.user_id ||0, this.newPassword).subscribe(result =>{
        this.systemAdmin = result;
        this.router.navigate(['system-admin-home-page']);
        if(this.changePassword)
          {
            this.changePassword = false;
            alert("Successfully changed password!");
          }
      });
    }
  }

  onAddCompanyAdmin(): void{
    this.router.navigate([`company-admin-form`]);
  }
  onAddCompany(): void{
    this.router.navigate([`company-form`]);
  }
  onAddSystemAdmin(): void{
    this.router.navigate([`system-admin-form`]);
  }

  onChangePassword(): void{
    this.changePassword = true;
  }
}
