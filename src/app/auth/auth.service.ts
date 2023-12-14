import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,BehaviorSubject} from 'rxjs';
import { RegistratedUser } from '../feature-modules/stakeholders/model/user.model';
import { User } from '../feature-modules/stakeholders/model/main-user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authTokenKey = 'authToken'; // Ključ pod kojim ćemo spremiti token u lokalnoj pohrani

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post('http://localhost:8081/api/auth/login', { username, password });
  }

  // Metoda za pohranu tokena u lokalnu pohranu
  storeAuthToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
  }

  // Metoda za dohvaćanje tokena iz lokalne pohrane
  getAuthToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  // Metoda za provjeru da li je korisnik autentificiran
  isAuthenticated(): boolean {
    const token = this.getAuthToken();
    return token !== null;
  }

  // Metoda za odjavu korisnika
  logout(): void {
    localStorage.removeItem(this.authTokenKey);
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
}