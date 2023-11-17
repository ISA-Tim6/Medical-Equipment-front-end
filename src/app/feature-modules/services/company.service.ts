import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/env/environment';
import { CompanyAdmin } from '../stakeholders/model/company-admin.model';
import { UserCompanyAdmin } from '../stakeholders/model/user-company-admin.model';
import { Equipment } from '../company-profile/model/equipment.model';
import { CompanyUpdate } from '../company-profile/model/companyUpdate.model';
import { Company } from '../company-profile/model/company.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  //apiHost: string = 'http://localhost:81/';
  //headers: HttpHeaders = new HttpHeaders({'Access-Control-Allow-Origin': '*' });

  constructor(private http: HttpClient) {}

  getCompany(id: number): Observable<any> {
    return this.http.get<any>(environment.apiHost + 'company/' + id);
  }

  addEquipment(equipment: Equipment, id: number): Observable<any> {
    return this.http.put<any>(
      environment.apiHost + 'company/addEquipment/' + id,
      equipment
    );
  }

  removeEquipment(equipment: Equipment, company_id: number): Observable<any> {
    return this.http.put<any>(
      environment.apiHost + 'company/removeEquipment/' + company_id,
      equipment
    );
  }

  updateCompany(companyUpdate: CompanyUpdate): Observable<any> {
    return this.http.put<any>(
      environment.apiHost + 'company/' + companyUpdate.company_id,
      companyUpdate
    );
  }

  getOtherCompanyAdminsForCompany(
    company_id: number,
    user_id: number
  ): Observable<CompanyAdmin[]> {
    return this.http.get<any>(
      environment.apiHost + 'companyAdmin/' + company_id + '/' + user_id
    );
  }

  getCompanies(): Observable<Company[]> {
    return this.http.get<any>(environment.apiHost + 'company');
  }

  searchByName(name: string): Observable<Company[]> {
    return this.http.get<any>(
      environment.apiHost + 'company/searchByName/' + name
    );
  }

  searchByCity(city: string): Observable<Company[]> {
    return this.http.get<any>(
      environment.apiHost + 'company/searchByCity/' + city
    );
  }

  searchByNameAndCity(name: string, city: string): Observable<Company[]> {
    return this.http.get<any>(
      environment.apiHost + 'company/searchByNameAndCity/' + name + '/' + city
    );
  }
}
