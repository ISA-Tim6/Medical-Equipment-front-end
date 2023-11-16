import { User } from '../../stakeholders/model/main-user.model';
import { Company } from './company.model';

export interface CompanyAdmin extends User {
  company: Company;
}
