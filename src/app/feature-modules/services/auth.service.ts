import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authTokenKey = 'authToken'; // Ključ pod kojim ćemo spremiti token u lokalnoj pohrani


  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private config: ConfigService,
    private router: Router,
    private http: HttpClient
  ) {
  }
  login1(username: string, password: string): Observable<any> {
    return this.http.post('http://localhost:81/api/auth/login', { username, password });
  }
  private access_token = null;

  // Metoda za pohranu tokena u lokalnu pohranu
  storeAuthToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
  }

  // Metoda za dohvaćanje tokena iz lokalne pohrane
  getAuthToken(): string | null {
    return localStorage.getItem("jwt");
  }

  // Metoda za provjeru da li je korisnik autentificiran
  isAuthenticated(): boolean {
    const token = this.getAuthToken();
    return token !== null;
  }

  // Metoda za odjavu korisnika
  logout(): void {
    localStorage.removeItem("jwt");
  }

  // Metoda za dohvaćanje informacija o korisniku iz JWT tokena
  getUser(): any {
    const token = this.getAuthToken();
    if (token) {
      const tokenPayload = this.parseJwt(token);
      return tokenPayload;
    } else {
      return null;
    }
  }

  private parseJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  getUserRoles(): string[] | null {
    const token = this.getAuthToken();
    if (token) {
      const tokenPayload = this.parseJwt(token);
      return tokenPayload.roles; // Pretpostavka da su uloge u JWT tokenu definisane kao niz "roles"
    } else {
      return null;
    }
  }
  tokenIsPresent() {
    return this.getAuthToken != undefined && this.getAuthToken != null;
  }

  login(user:any) {
    const loginHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    // const body = `username=${user.username}&password=${user.password}`;
    const body = {
      'username': user.username,
      'password': user.password
    };
    console.log(this.config.login_url)
    console.log(JSON.stringify(body))
    console.log(loginHeaders)
    return this.apiService.post(this.config.login_url, JSON.stringify(body), loginHeaders)
      .pipe(map((res:any) => {
        console.log('Login success');
        console.log(res.body.token);
        this.access_token = res.body.token;
        localStorage.setItem("jwt", res.body.token)
      }));
  }
}