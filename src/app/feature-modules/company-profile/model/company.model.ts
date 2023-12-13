import { Equipment } from "./equipment.model";
import { CompanyAdmin } from "../../stakeholders/model/company-admin.model";
import {Address} from "./address.model";
import { WorkingTimeCalendar } from "./working-calendar.model";
export interface Company {
    company_id?:number;
	name:string;	
	averageGrade:number;
	address:Address;
	equipment?:Equipment[];
	openingHours: string;
	closingHours: string;
	workingTimeCalendar:WorkingTimeCalendar
}