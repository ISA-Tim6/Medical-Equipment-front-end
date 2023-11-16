import { Component } from '@angular/core';
import { SystemAdminService } from '../system-admin.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User, Employment } from '../../stakeholders/model/user.model';

@Component({
  selector: 'app-system-admin-form',
  templateUrl: './system-admin-form.component.html',
  styleUrls: ['./system-admin-form.component.css']
})
export class SystemAdminFormComponent {

constructor(private service: SystemAdminService){}

adminForm = new FormGroup({
  email: new FormControl('',[Validators.required]),
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    name: new FormControl('',[Validators.required]),
    surname: new FormControl('',[Validators.required]),
    city: new FormControl('',[Validators.required]),
    country: new FormControl('',[Validators.required]),
    phoneNumber: new FormControl('',[Validators.required]),
    infoAboutInstitution: new FormControl('',[Validators.required]),
});

onSave(): void{
  const user : User= {
    email: this.adminForm.value.email || "",
    username:this.adminForm.value.username || "",
    password: this.adminForm.value.password || "",
    name: this.adminForm.value.name || "",
    surname: this.adminForm.value.surname || "",
    city: this.adminForm.value.city || "",
    country: this.adminForm.value.country || "",
    phoneNumber: this.adminForm.value.phoneNumber || "",
    employment: Employment.SISTEM_ADMIN,
    infoAboutInstitution: this.adminForm.value.infoAboutInstitution || "",
    loggedBefore: false
  };

  this.service.addSystemAdmin(user).subscribe({

  });
}
}
