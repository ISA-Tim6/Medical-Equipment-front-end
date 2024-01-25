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
import { Appointment } from '../company-profile/model/appointment.model';
import { Item } from '../company-overview/model/item.model';
import { Reservation } from '../company-profile/model/reservation.model';
import { compileClassMetadata } from '@angular/compiler';


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

  updateEquipmentWithId(equipment:Equipment,equipment_id:number):Observable<any>{
    return this.http.put<any>(
      environment.apiHost+'equipment/updateEquipment/'+equipment_id,
      equipment
    )
  }

  addAppointment(appointment: Appointment, compamy_id: number,company_admin_id:number): Observable<any> {
    return this.http.put<any>(
      environment.apiHost +
        'company/addAppointment/' +
        compamy_id +
        '/' +
        company_admin_id,
      appointment
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

  searchEquipmentByCompany(
    name: string,
    company_id: number
  ): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(
      environment.apiHost +
        'equipment/searchEquipmentByCompany/' +
        name +
        '/' +
        company_id
    );
  }
  searchByNameAndCity(name: string, city: string): Observable<Company[]> {
    return this.http.get<any>(
      environment.apiHost + 'company/searchByNameAndCity/' + name + '/' + city
    );
  }

  addItem(item: Item): Promise<Item | undefined> {
    return this.http
      .post<Item>(environment.apiHost + 'item/saveItem/', item)
      .toPromise();
  }
  addReservation(reservation: Reservation): Promise<Reservation | undefined> {
    return this.http
      .post<Reservation>(
        environment.apiHost + 'reservation/saveReservation/',
        reservation
      )
      .toPromise();
  }

  updateEquipment(equipment: Equipment): Promise<Equipment | undefined> {
    return this.http
      .put<Equipment>(
        environment.apiHost + 'equipment/updateEquipment/',
        equipment
      )
      .toPromise();
  }

  updateAppointment(
    appointment: Appointment,
    compamy_id: number,
    company_admin_id: number
  ): Promise<Appointment | undefined> {
    return this.http
      .put<Appointment>(
        environment.apiHost +
          'company/updateAppointment/' +
          compamy_id +
          '/' +
          company_admin_id,
        appointment
      )
      .toPromise();
  }

  findFreeSlots(company_id: number, date: string): Observable<string[]> {
    return this.http.get<any>(
      environment.apiHost + 'company/findFreeSlots/' + company_id + '/' + date
    );
  }

  addExtraordinaryAppointment(
    appointment: Appointment,
    compamy_id: number
  ): Promise<number | undefined> {
    return this.http
      .put<any>(
        environment.apiHost +
          'company/addExtraordinaryAppointment/' +
          compamy_id,
        appointment
      )
      .toPromise();
  }

  sendMessage(): Observable<string>{
    return this.http.post<any>(
      environment.apiHost + 'foo/producer', "poruka poslata uspesnoo"
    );
  }
}
