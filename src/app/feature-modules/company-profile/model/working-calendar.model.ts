import { Appointment } from "./appointment.model";
export interface WorkingTimeCalendar {
    working_time_calendar_id?:number;
    appointments:Appointment[];
	
}