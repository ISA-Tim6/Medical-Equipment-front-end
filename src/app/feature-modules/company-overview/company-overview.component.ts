import { Component,OnInit } from '@angular/core';
import { Company } from '../company-profile/model/company.model';
import { CompanyService } from '../services/company.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-company-overview',
  templateUrl: './company-overview.component.html',
  styleUrls: ['./company-overview.component.css']
})
export class CompanyOverviewComponent implements OnInit{

  id:number;
  company:Company;
  constructor(private service: CompanyService,private activatedRoute:ActivatedRoute) {
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.id=params['company_id'];
    this.service.getCompany(this.id).subscribe({
      next: (result: Company) => {
        this.company = result;
      },
    });
  })}


}
