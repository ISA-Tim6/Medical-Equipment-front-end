import { Component, Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './feature-modules/services/auth.service';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  title = 'MedicalEquipment';


  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {

  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(["/login"])
  }
  isCompanyAdmin(): boolean {
    const userRoles = this.authService.getUserRoles();
    return userRoles !== null && userRoles.includes('ROLE_COMPANY_ADMIN');
}

  isRegisteredUser(): boolean {
      const userRoles = this.authService.getUserRoles();
      return userRoles !== null && userRoles.includes('ROLE_REGISTRATED_USER');
  }

  isSystemAdmin(): boolean {
    const userRoles = this.authService.getUserRoles();
    return userRoles !== null && userRoles.includes('ROLE_SYSTEM_ADMIN');
  }

}
