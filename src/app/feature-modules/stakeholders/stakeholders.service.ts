import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistratedUser } from './model/user.model';
import { environment } from 'src/env/environment';
import { User } from './model/main-user.model';

@Injectable({
  providedIn: 'root',
})
export class StakeholdersService {
  constructor(private http: HttpClient) {}

  getUser(): Observable<RegistratedUser> {
    return this.http.get<RegistratedUser>(environment.apiHost + 1);
  }

  getByUsername(username: string): Observable<User> {
    return this.http.get<User>(
      environment.apiHost + 'user/username/' + username
    );
  }

  updateUser(
    user: RegistratedUser,
    oldUsername: string
  ): Observable<RegistratedUser> {
    return this.http.put<RegistratedUser>(
      environment.apiHost + 'updateUser/' + oldUsername,
      user
    );
  }
}
