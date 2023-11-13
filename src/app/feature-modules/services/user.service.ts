import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistratedUser } from '../stakeholders/model/user.model';
import { environment } from 'src/env/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //apiHost: string = 'http://localhost:81/';
  //headers: HttpHeaders = new HttpHeaders({'Access-Control-Allow-Origin': '*' });

  constructor(private http: HttpClient) {}


  registerUser(user: RegistratedUser): Observable<any> {
    console.log(user.infoAboutInstitution);
    return this.http.post<any>(environment.apiHost + 'registerUser', user);
  }
}
