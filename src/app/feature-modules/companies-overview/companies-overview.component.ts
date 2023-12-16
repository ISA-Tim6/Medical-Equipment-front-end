import { Component, OnInit } from '@angular/core';
import { Company } from '../company-profile/model/company.model';
import { Router } from '@angular/router';
import { CompanyService } from '../services/company.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-companies-overview',
  templateUrl: './companies-overview.component.html',
  styleUrls: ['./companies-overview.component.css'],
})
export class CompaniesOverviewComponent implements OnInit {
  name: string = '';
  city: string = '';
  minRating: number = 0;
  maxRating: number = 0;
  filterDisabled: boolean = true;
  searchedCompanies: Company[] = [];

  constructor(private service: CompanyService, private router: Router, private authService:AuthService) {}
  ngOnInit(): void {
    this.service.getCompanies().subscribe({
      next: (result: Company[]) => {
        this.companies = result;
        this.filterDisabled = true;
        this.searchedCompanies = this.companies;
      },
    });
  }

  companies: Company[];
  id: number;
  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
  showDetails(c: Company): void {
    //this.router.navigate([`company/${c.company_id}`]);
    if(this.isLoggedIn())
      this.router.navigate([`companyProfile/${c.company_id}/${2}`]);
  }

  search(): void {
    if (
      this.name != '' &&
      this.name != undefined &&
      this.name != null &&
      this.city != '' &&
      this.city != undefined &&
      this.city != null
    ) {
      this.service.searchByNameAndCity(this.name, this.city).subscribe({
        next: (result: Company[]) => {
          this.companies = result;
          this.filterDisabled = false;
          this.searchedCompanies = this.companies;
        },
      });
    } else if (this.name != '' && this.name != undefined && this.name != null) {
      this.service.searchByName(this.name).subscribe({
        next: (result: Company[]) => {
          this.companies = result;
          this.filterDisabled = false;
          this.searchedCompanies = this.companies;
        },
      });
    } else if (this.city != '' && this.city != undefined && this.city != null) {
      this.service.searchByCity(this.city).subscribe({
        next: (result: Company[]) => {
          this.companies = result;
          this.filterDisabled = false;
          this.searchedCompanies = this.companies;
        },
      });
    } else {
      alert('Please enter name/city to search companies.');
    }
  }

  reset(): void {
    this.service.getCompanies().subscribe({
      next: (result: Company[]) => {
        this.companies = result;
        this.name = '';
        this.city = '';
        this.filterDisabled = true;
        this.minRating = 0;
        this.maxRating = 0;
        this.searchedCompanies = this.companies;
      },
    });
  }

  filter(): void {
    this.companies = this.searchedCompanies;
    if (
      this.minRating != null &&
      this.minRating != undefined &&
      this.maxRating != null &&
      this.maxRating != undefined
    ) {
      if (this.minRating <= this.maxRating) {
        //pronadji one u opsegu
        this.companies = this.companies.filter((company) => {
          return (
            company.averageGrade >= this.minRating &&
            company.averageGrade <= this.maxRating
          );
        });
      } else {
        alert('ERROR: Min rating > max rating!');
      }
      return;
    }
    if (this.minRating != null && this.minRating != undefined) {
      //pronadji one cija je ocjena veca od min
      this.companies = this.companies.filter((company) => {
        return company.averageGrade >= this.minRating;
      });
      return;
    }
    if (this.maxRating != null && this.maxRating != undefined) {
      //pronadji one cija je ocjena manja od max
      this.companies = this.companies.filter((company) => {
        return company.averageGrade <= this.maxRating;
      });
      return;
    }
    alert('You need to enter min/max rating to filter results.');
  }
}
