import { Reservation } from "../../company-profile/model/reservation.model";
import { WorkingTimeCalendar } from "../../company-profile/model/working-calendar.model";

export interface CompanyCalendar{
    workingTimeCalendarDto: WorkingTimeCalendar;
    reservations: Reservation[];
}