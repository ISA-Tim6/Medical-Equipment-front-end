import { Component, OnInit } from '@angular/core';
import { Company } from '../company-profile/model/company.model';
import { Router } from '@angular/router';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-companies-overview',
  templateUrl: './companies-overview.component.html',
  styleUrls: ['./companies-overview.component.css'],
})
export class CompaniesOverviewComponent implements OnInit {
  selectedOption: string;
  parameter: string;
  minRating: number = 0;
  maxRating: number = 0;
  filterDisabled: boolean = true;
  searchedCompanies: Company[] = [];

  constructor(private service: CompanyService, private router: Router) {}
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

  showDetails(c: Company): void {
    this.router.navigate([`company/${c.company_id}`]);
  }

  search(): void {
    if (
      this.parameter != '' &&
      this.parameter != undefined &&
      this.parameter != null &&
      this.selectedOption != '' &&
      this.selectedOption != undefined &&
      this.selectedOption != null
    ) {
      if (this.selectedOption == 'Name') {
        this.service.searchByName(this.parameter).subscribe({
          next: (result: Company[]) => {
            this.companies = result;
            this.filterDisabled = false;
            this.searchedCompanies = this.companies;
          },
        });
      } else {
        this.service.searchByCity(this.parameter).subscribe({
          next: (result: Company[]) => {
            this.companies = result;
            this.filterDisabled = false;
            this.searchedCompanies = this.companies;
          },
        });
      }
    } else alert('You need to enter a parameter for search.');
  }

  reset(): void {
    this.service.getCompanies().subscribe({
      next: (result: Company[]) => {
        this.companies = result;
        this.parameter = '';
        this.selectedOption = '';
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
