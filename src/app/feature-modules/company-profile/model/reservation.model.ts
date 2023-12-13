import { Item } from '../../company-overview/model/item.model';
import { RegistratedUser } from '../../stakeholders/model/user.model';
import { Appointment } from './appointment.model';

export interface Reservation {
  reservation_id?: number;
  user: RegistratedUser;
  items: Item[];
  appointment: Appointment;
  // qr_code: 1;
  reservationStatus: string;
}
