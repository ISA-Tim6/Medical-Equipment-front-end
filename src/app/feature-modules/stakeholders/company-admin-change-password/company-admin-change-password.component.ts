import { Component } from '@angular/core';
import { CompanyAdminService } from '../../services/company-admin.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CompanyAdmin } from '../model/company-admin.model';


@Component({
  selector: 'app-company-admin-change-password',
  templateUrl: './company-admin-change-password.component.html',
  styleUrls: ['./company-admin-change-password.component.css']
})
export class CompanyAdminChangePasswordComponent {
  constructor(private service: CompanyAdminService ,private router: Router,private activatedRoute:ActivatedRoute) {}

  password:string;
  repetredPassword:string;

  public isLongPassword() {
    let isLong: boolean = false;
    if (this.password.length >= 5) isLong = true;

    return isLong;
  }

  public isRepetedPasswodCorrect(){
    return this.password==this.repetredPassword;
  }


  public OnConfirm():void{
    if(this.isLongPassword() && this.isRepetedPasswodCorrect())
    {
      this.activatedRoute.params.subscribe(params=>{
        let id=params['id'];
        this.service.changePassword(id,this.password).subscribe({
          next:(result:CompanyAdmin)=>{
            this.router.navigate([`company-admin-profile`]);
          }
        })
      
    })

    }
  }
}
