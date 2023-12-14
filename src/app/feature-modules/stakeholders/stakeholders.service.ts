import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { RegistratedUser } from './model/user.model';
import { environment } from 'src/env/environment';
import { User } from './model/main-user.model';
import { WorkingTimeCalendar } from '../company-profile/model/working-calendar.model';
import { CompanyCalendar } from './model/company-calendar.model';
import { Company } from '../company-profile/model/company.model';
import { ApiService } from '../services/api.service';
import { ConfigService } from '../services/config.service';
import { UserService } from '../services/user.service';
import { CompanyAdmin } from './model/company-admin.model';

@Injectable({
  providedIn: 'root',
})
export class StakeholdersService {
  currentUser: any;
  constructor(private http: HttpClient,private apiService: ApiService,
    private config: ConfigService,private userService: UserService) {}

    getUser(): Observable<RegistratedUser> {
      return this.apiService.get(this.config.whoami_url)
        .pipe(
          switchMap(user => {
            console.log(user);
            this.currentUser = user;
            return this.http.get<RegistratedUser>(environment.apiHost + "registratedUser/" + this.currentUser.user_id);
          })
        );
    }

    getCompanyAdmin(): Observable<CompanyAdmin> {
      return this.apiService.getAdmin(this.config.whoami_companyAdmin_url)
        .pipe(
          switchMap(user => {
            console.log(user);
            this.currentUser = user;
            return this.http.get<CompanyAdmin>(environment.apiHost + "companyAdmin/" + this.currentUser.id);
          })
        );
    }

    getSystemAdmin(): Observable<User> {
      return this.apiService.get(this.config.whoami_url)
        .pipe(
          switchMap(user => {
            console.log(user);
            this.currentUser = user;
            return this.http.get<User>(environment.apiHost + "user/systemAdmin/" + this.currentUser.user_id);
          })
        );
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
