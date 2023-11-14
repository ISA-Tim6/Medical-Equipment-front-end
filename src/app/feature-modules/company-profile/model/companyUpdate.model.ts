import {Address} from "./address.model";
export interface CompanyUpdate {
    company_id?:number;
	name:string;	
	averageGrade:number;
	address:Address;
}