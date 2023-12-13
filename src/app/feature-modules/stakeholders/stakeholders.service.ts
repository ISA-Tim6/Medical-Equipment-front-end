import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistratedUser } from './model/user.model';
import { environment } from 'src/env/environment';
import { User } from './model/main-user.model';
import { WorkingTimeCalendar } from '../company-profile/model/working-calendar.model';
import { CompanyCalendar } from './model/company-calendar.model';
import { Company } from '../company-profile/model/company.model';

@Injectable({
  providedIn: 'root',
})
export class StakeholdersService {
  constructor(private http: HttpClient) {}

  getUser(): Observable<RegistratedUser> {
    return this.http.get<RegistratedUser>(environment.apiHost +"registratedUser/" + 1);
  }

  getByUsername(username: string): Observable<any> {
    return this.http.get<User>(
      environment.apiHost + 'user/username/' + username
    );
  }

  updateUser(
    user: RegistratedUser,
    oldUsername: string
  ): Observable<RegistratedUser> {
    return this.http.put<RegistratedUser>(
      environment.apiHost + 'registratedUser/updateUser/' + oldUsername,
      user
    );
  }

  getCompanyCalendar(company_id: number): Observable<CompanyCalendar>{
    return this.http.get<CompanyCalendar>(environment.apiHost +"company/companyCalendar/" + company_id);
  }

  getCompany(company_id: number) : Observable<Company>{
    return this.http.get<Company>(environment.apiHost +"company/" + company_id);
  }
}
