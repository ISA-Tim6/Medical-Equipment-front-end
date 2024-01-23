import { Component , OnInit} from '@angular/core';
import { RegistratedUser } from '../model/user.model';
import { StakeholdersService } from '../stakeholders.service';
import { CompanyAdmin } from '../model/company-admin.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-with-reservations',
  templateUrl: './users-with-reservations.component.html',
  styleUrls: ['./users-with-reservations.component.css']
})
export class UsersWithReservationsComponent {
  constructor(private service: StakeholdersService,private router:Router) {}

  users: RegistratedUser[];
  company_id:number;
  companyAdmin:CompanyAdmin;
  
  ngOnInit(): void {
    
    this.service.getCompanyAdmin().subscribe({
      next: (result: CompanyAdmin) => {
        console.log(result);
        this.companyAdmin=result;
        this.company_id=this.companyAdmin.company_id;

        if(this.companyAdmin.loggedBefore==false){
          this.router.navigate([`company-admin-password/${this.companyAdmin.id}`]);
        }

        this.service.getUsersWithReservations(this.company_id).subscribe({
          next: (result: RegistratedUser[]) => {
          this.users=result;
          console.log(result);         
          }
        })



      },
    });

    
         
    
  }
}
