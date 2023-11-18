import { Component } from '@angular/core';
import { SystemAdminService } from '../system-admin.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User, Employment } from '../../stakeholders/model/main-user.model';

@Component({
  selector: 'app-system-admin-form',
  templateUrl: './system-admin-form.component.html',
  styleUrls: ['./system-admin-form.component.css'],
})
export class SystemAdminFormComponent {
  constructor(private service: SystemAdminService) {}

  adminForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    infoAboutInstitution: new FormControl('', [Validators.required]),
  });

  onSave(): void {
    if(!this.isPhoneNumberValid())
    {
      alert("Phone number is not in correct format");
      return;
    }
    if(!this.isLongPassword())
    {
      alert("Password must have at least 5 characters");
      return;
    }

    if(!this.isValidEmail())
    {
      alert("Email is not in correct format");
      return;
    }
    if(this.adminForm.valid)
    {
      const user: User = {
        email: this.adminForm.value.email || '',
        username: this.adminForm.value.username || '',
        password: this.adminForm.value.password || '',
        name: this.adminForm.value.name || '',
        surname: this.adminForm.value.surname || '',
        city: this.adminForm.value.city || '',
        country: this.adminForm.value.country || '',
        phoneNumber: this.adminForm.value.phoneNumber || '',
        employment: Employment.SISTEM_ADMIN,
        infoAboutInstitution: this.adminForm.value.infoAboutInstitution || '',
        loggedBefore: false,
      };
  
      this.service.findByEmail(user.email).subscribe(result => {
        if(result != -1)
        {
          alert("Email already in use");
        }else{
          this.service.findByUsername(user.username).subscribe(res => {
            if(res != -1)
            {
              alert("Username already in use");
            }else{
              this.service.addSystemAdmin(user).subscribe( result => {
                this.adminForm.reset();
                alert("System admin saved!");
              });
            }
          });
        }
      });
    }else{
      alert("Fields can't be empty");
    }
  }

  
  isPhoneNumberValid(){
    let isValidPhoneNumber:boolean=false;
    let sampleRegEx: RegExp = /[0-9]+/;
    if(sampleRegEx.test(this.adminForm.controls.phoneNumber.value || ''))
      if((this.adminForm.controls.phoneNumber.value || '').length>3)
        isValidPhoneNumber=true;

    return isValidPhoneNumber;
  }

  public isLongPassword() {
    let isLong: boolean = false;
    if ((this.adminForm.controls.password.value || '').length >= 5) isLong = true;

    return isLong;
  }

  public isValidEmail() {
    let sampleRegEx: RegExp =
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return sampleRegEx.test(this.adminForm.controls.email.value || '');
  }
}
