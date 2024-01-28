import { Component ,OnInit} from '@angular/core';
import { Contract } from '../model/contact.model';
import { CompanyAdmin } from '../model/company-admin.model';
import { StakeholdersService } from '../stakeholders.service';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../company-profile/model/company.model';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent {

  contracts:Contract[];
  companyAdmin:CompanyAdmin;
  company:Company;

  constructor(private stakeHolderService: StakeholdersService,private companyService:CompanyService) {}

  ngOnInit(): void {

    this.stakeHolderService.getCompanyAdmin().subscribe({
      next: (result: CompanyAdmin) => {
        console.log(result);
        this.companyAdmin=result;
        let companyId=this.companyAdmin.company_id;

        this.companyService.getCompany(companyId).subscribe({
          next:(result: Company)=>{
            this.company=result;

            this.stakeHolderService.getAllCompnayContracts(this.company.name).subscribe({
              next:(result:Contract[])=>{
                this.contracts=result;
              }
            })
          }
        })
      },
    });
    
  }

  sendMessage():void{
    let a:string="porukica";
    this.stakeHolderService.sendMessage(a).subscribe({
      next:(result:string)=>{
        console.log(result)
      }
    })
  }


}
