import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './model/user.model';
import { environment } from 'src/env/environment';

@Injectable({
  providedIn: 'root',
})
export class StakeholdersService {
  constructor(private http: HttpClient) {}

  getUser(): Observable<User> {
    return this.http.get<User>(environment.apiHost + 'getUser/' + 1);
  }
}
