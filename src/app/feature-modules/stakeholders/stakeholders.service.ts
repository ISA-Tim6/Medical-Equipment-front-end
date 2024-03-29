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
import { Reservation } from '../company-profile/model/reservation.model';
import { Appointment } from '../company-profile/model/appointment.model';
import { HttpParams } from '@angular/common/http';
import { CanceledAppointment } from '../company-profile/model/canceled-appointment.model';
import { Contract } from './model/contact.model';

@Injectable({
  providedIn: 'root',
})
export class StakeholdersService {
  currentUser: any;
  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private config: ConfigService,
    private userService: UserService
  ) {}

  getUser(): Observable<RegistratedUser> {
    return this.apiService.get(this.config.whoami_url).pipe(
      switchMap((user) => {
        console.log(user);
        this.currentUser = user;
        return this.http.get<RegistratedUser>(
          environment.apiHost + 'registratedUser/' + this.currentUser.user_id
        );
      })
    );
  }

  getCompanyAdmin(): Observable<CompanyAdmin> {
    return this.apiService.getAdmin(this.config.whoami_companyAdmin_url).pipe(
      switchMap((user) => {
        console.log(user);
        this.currentUser = user;
        return this.http.get<CompanyAdmin>(
          environment.apiHost + 'companyAdmin/' + this.currentUser.id
        );
      })
    );
  }

  getSystemAdmin(): Observable<User> {
    return this.apiService.get(this.config.whoami_url).pipe(
      switchMap((user) => {
        console.log(user);
        this.currentUser = user;
        return this.http.get<User>(
          environment.apiHost + 'user/systemAdmin/' + this.currentUser.user_id
        );
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

  getCompanyCalendar(company_id: number): Observable<CompanyCalendar> {
    return this.http.get<CompanyCalendar>(
      environment.apiHost + 'company/companyCalendar/' + company_id
    );
  }

  getCompany(company_id: number): Observable<Company> {
    return this.http.get<Company>(
      environment.apiHost + 'company/' + company_id
    );
  }
  getAllFutureReservations(id: number): Observable<Appointment[]> {
    return this.http.get<any>(
      environment.apiHost + 'reservation/getFutureReservation/' + id
    );
  }

  getQrByUser(id: number): Observable<Blob[]> {
    return this.http.get<Blob[]>(environment.apiHost + 'reservation/qrs/' + id);
  }
  getNewQrByUser(id: number): Observable<Blob[]> {
    return this.http.get<Blob[]>(
      environment.apiHost + 'reservation/newqrs/' + id
    );
  }
  getAcceptedQrByUser(id: number): Observable<Blob[]> {
    return this.http.get<Blob[]>(
      environment.apiHost + 'reservation/acceptedqrs/' + id
    );
  }
  getRejectedQrByUser(id: number): Observable<Blob[]> {
    return this.http.get<Blob[]>(
      environment.apiHost + 'reservation/rejectedqrs/' + id
    );
  }

   getNewReservations(id:number):Observable<Reservation>{

    return this.http.get<any>(
      environment.apiHost + 'reservation/findNewReservations/' + id
    );
  }


  deliverReservation(id:number):Observable<Reservation>{

    return this.http.get<any>(
      environment.apiHost + 'reservation/deliverReservation/' + id
    );
  }

  getUsersWithReservations(id:number):Observable<RegistratedUser[]>{
    return this.http.get<any>(
      environment.apiHost + 'user/withReservation/' + id
    );
  }
  
  deliverReservationUsingQRCode(file: File):Observable<Reservation>{
    let fd = new FormData();
    fd.append('qrCodeFile', file);
    return this.http.post<any>(
      environment.apiHost + 'reservation/uploadQrCode', fd
    );
      }

  getAcceptedReservationsByUser(id: number): Observable<Reservation[]> {
    return this.http.get<any>(
      environment.apiHost + 'reservation/acceptedReservations/' + id
    );
  }
  cancelAppointment(appointmentId: number): Observable<any> {
    return this.http.post<any>(
      environment.apiHost + 'reservation/cancelAppointment/' + appointmentId,
      null
    );
  }

  getCanceledAppointments(id: number): Observable<CanceledAppointment> {
    return this.http.get<any>(
      environment.apiHost + 'reservation/canceledAppointments/' + id
    );
  }
  getAllCompnayContracts(company: string): Observable<Contract[]> {
    return this.http.get<any>(environment.apiHost + 'contract/' + company);
  }

  sendMessage(message: string, company: string): Observable<boolean> {
    return this.http.post<any>(
      environment.apiHost + 'foo/producer1/' + company,
      message
    );
  }
}
