import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/env/environment';
import { CompanyAdmin } from '../stakeholders/model/company-admin.model';
import { UserCompanyAdmin } from '../stakeholders/model/user-company-admin.model';


@Injectable({
  providedIn: 'root'
})
export class CompanyAdminService {

  //apiHost: string = 'http://localhost:81/';
  //headers: HttpHeaders = new HttpHeaders({'Access-Control-Allow-Origin': '*' });
 


  constructor(private http: HttpClient) { }



  updateCompanyAdmin(userCompanyAdmin:UserCompanyAdmin):Observable<any>{
    return this.http.put<any>(environment.apiHost+"companyAdmin/"+userCompanyAdmin.user_id,userCompanyAdmin);

  }

  getCompanyAdmin(id:number): Observable<any>{
    return this.http.get<any>(environment.apiHost+"companyAdmin/"+id);
    
  }

  getUserByUsername(username:string): Observable<any>{
    return this.http.get<any>(environment.apiHost+"user/username/"+username);   
  }

  getUserByEmail(email:string): Observable<any>{
    return this.http.get<any>(environment.apiHost+"user/"+email);   
  }

  changePassword(id:number,password:string):Observable<any>{
    return this.http.put<any>(environment.apiHost+"companyAdmin/changePassword/"+id,password);

  }



}