
import { CompanyAdmin } from "../../stakeholders/model/company-admin.model";

export interface Appointment {
    appointment_id?:number;
	appointmentStatus?:string;
    duration:number;
    date:Date;
    time:string;
    end?:string;
    admin?:CompanyAdmin;
}