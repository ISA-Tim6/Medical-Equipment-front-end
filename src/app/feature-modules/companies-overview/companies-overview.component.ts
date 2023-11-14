import { Component,OnInit } from '@angular/core';
import { Company } from '../company-profile/model/company.model';
import { Router } from '@angular/router';
import { CompanyService } from '../services/company.service';


@Component({
  selector: 'app-companies-overview',
  templateUrl: './companies-overview.component.html',
  styleUrls: ['./companies-overview.component.css']
})
export class CompaniesOverviewComponent implements OnInit{

  constructor(private service: CompanyService,private router:Router) {
  }
  ngOnInit(): void {
    this.service.getCompanies().subscribe({
    next:(result:Company[])=>{
      this.companies=result;
    }
  })}

  companies:Company[];
  id:number;

  showDetails(c:Company):void{
    this.router.navigate([`company/${c.company_id}`]);

  }
}
