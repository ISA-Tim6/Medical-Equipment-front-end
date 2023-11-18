import { Component } from '@angular/core';
import { Form, Validators, FormControl, FormGroup } from '@angular/forms';
import { SystemAdminService } from '../system-admin.service';
import { Company } from '../model/company.model';
import { Address } from '../model/address.model';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent {

  constructor(private service: SystemAdminService){}

  companyForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    streetNumber: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    longitude: new FormControl(0, [Validators.required]),
    latitude: new FormControl(0, [Validators.required]),
    openingHours: new FormControl('', [Validators.required]),
    closingHours: new FormControl('', [Validators.required])
  });

  onSave(): void{
    const address: Address = {
      street: this.companyForm.value.street || '',
      streetNumber: this.companyForm.value.streetNumber || '',
      city: this.companyForm.value.city || '',
      country: this.companyForm.value.country || '',
      longitude: this.companyForm.value.longitude || 0,
      latitude: this.companyForm.value.latitude || 0,
    }
    
    const company: Company = {
      name: this.companyForm.value.name || '',
      address: address,
      openingHours: this.companyForm.value.openingHours || '',
      closingHours: this.companyForm.value.closingHours || ''
    }

    if(this.isValid())
    {
      this.service.addCompany(company).subscribe(result => {
        this.companyForm.reset();
        alert("Company saved");
      });
    }else{
      alert("Field can't be empty");
    }
  }

  isValid(): boolean{
    return this.companyForm.valid;
  }
}
