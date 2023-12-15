import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { RegistratedUser } from './model/user.model';
import { environment } from 'src/env/environment';
import { User } from './model/main-user.model';
import { ApiService } from '../services/api.service';
import { ConfigService } from '../services/config.service';
import { UserService } from '../services/user.service';
import { CompanyAdmin } from './model/company-admin.model';
import { Reservation } from '../company-profile/model/reservation.model';
import { Appointment } from '../company-profile/model/appointment.model';

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
  getAllFutureReservations(
    id: number,
  ): Observable<Appointment[]> {
    return this.http.get<any>(
      environment.apiHost + 'reservation/getFutureReservation/' + id
    );
  }
}
