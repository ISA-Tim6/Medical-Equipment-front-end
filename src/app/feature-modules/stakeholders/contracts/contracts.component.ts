import { Component, OnInit } from '@angular/core';
import { Contract } from '../model/contact.model';
import { CompanyAdmin } from '../model/company-admin.model';
import { StakeholdersService } from '../stakeholders.service';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../company-profile/model/company.model';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css'],
})
export class ContractsComponent {
  contracts: Contract[];
  companyAdmin: CompanyAdmin;
  company: Company;
  cancelled: boolean = false;

  constructor(
    private stakeHolderService: StakeholdersService,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.stakeHolderService.getCompanyAdmin().subscribe({
      next: (result: CompanyAdmin) => {
        console.log(result);
        this.companyAdmin = result;
        let companyId = this.companyAdmin.company_id;

        this.companyService.getCompany(companyId).subscribe({
          next: (result: Company) => {
            this.company = result;

            this.stakeHolderService
              .getAllCompnayContracts(this.company.name)
              .subscribe({
                next: (result: Contract[]) => {
                  this.contracts = result;
                },
              });
          },
        });
      },
    });
  }

  sendMessage(): void {
    if (!this.cancelled) {
      let a: string =
        'It is not possible to deliver the agreed quantity of equipment.';
      this.stakeHolderService.sendMessage(a, this.company.name).subscribe({
        next: (result: boolean) => {
          console.log(result);
          if (!result) alert('Message not sent.');
          else alert('Notification successfully sent!');
          if (result) this.cancelled = true;
        },
      });
    } else alert('Already cancelled.');
  }
}
