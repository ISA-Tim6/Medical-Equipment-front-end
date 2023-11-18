import { Component, OnInit, Output } from '@angular/core';
import { Form, FormGroup, FormControl, Validators } from '@angular/forms';
import { SystemAdminService } from '../system-admin.service';
import { Employment } from '../../stakeholders/model/main-user.model';
import { Company } from '../model/company.model';
import { CompanyAdmin } from '../model/company-admin-model';

@Component({
  selector: 'app-company-admin-form',
  templateUrl: './company-admin-form.component.html',
  styleUrls: ['./company-admin-form.component.css'],
})
export class CompanyAdminFormComponent implements OnInit {
  companies: Company[] = [];
  selectedCompany: Company;
  constructor(private service: SystemAdminService) {}

  ngOnInit(): void {
    this.service.getCompanies().subscribe((result) => {
      this.companies = result;
      this.selectedCompany = this.companies[0];
    });
  }

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
    company: new FormControl(this.companies[0], [Validators.required])
  });

  onSave(): void {

    if(this.adminForm.controls.email.valid && this.adminForm.controls.username.valid && this.adminForm.controls.password.valid && this.adminForm.controls.name.valid
      && this.adminForm.controls.surname.valid && this.adminForm.controls.city.valid && this.adminForm.controls.country.valid && this.adminForm.controls.phoneNumber.valid
      && this.adminForm.controls.infoAboutInstitution.valid) 
    {
      const user: CompanyAdmin = {
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
        company: this.selectedCompany,
      };
  
      this.service
        .addCompanyAdmin(user, this.selectedCompany.company_id || 0)
        .subscribe( (result) => {
            this.adminForm.reset();
            alert("Company admin saved!");
        });
    }else{
      alert("Fields can't be empty");
    }
  }

  onSelectCompany($event: any): void {}

}
