import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { RegistratedUser } from '../stakeholders/model/user.model';
import { environment } from 'src/env/environment';
import { ConfigService } from './config.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser: any;
  constructor(private http: HttpClient,private apiService: ApiService,
    private config: ConfigService) {}

  registerUser(user: RegistratedUser): Observable<any> {
    console.log(user.infoAboutInstitution);
    return this.http.post<any>(environment.apiHost + 'auth/registerUser', user);
  }
  

  getMyInfo() {
    return this.apiService.get(this.config.whoami_url)
      .pipe(map(user => {
        console.log(user);
        this.currentUser = user;
        return user;
      }));
  }

  getAll() {
    return this.apiService.get(this.config.users_url);
  }
}
