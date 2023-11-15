import { Injectable } from '@angular/core';
import { Company } from './model/company.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/env/environment';
import { User } from '../stakeholders/model/user.model';
import { CompanyAdmin } from './model/company-admin-model';
import { Equipment } from '../company-profile/model/equipment.model';

@Injectable({
  providedIn: 'root'
})
export class SystemAdminService {

  constructor(private http: HttpClient) { }

  addCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(environment.apiHost + 'company/create', company);
  }

  addSystemAdmin(admin: User): Observable<User>{
    return this.http.post<User>(environment.apiHost+"saveUser", admin)
  }
  
  getCompanies(): Observable<Company[]>{
    return this.http.get<Company[]>(environment.apiHost + 'company/getAllCompanies');
  }

  addCompanyAdmin(admin: CompanyAdmin, company_id: number): Observable<CompanyAdmin>{
    return this.http.post<CompanyAdmin>(environment.apiHost+"companyAdmin/create/" + company_id, admin)
  }

  searchEquipment(name: string): Observable<Equipment[]>{
    return this.http.get<Equipment[]>(environment.apiHost + 'equipment/searchEquipment/'+ name);
  }
}
