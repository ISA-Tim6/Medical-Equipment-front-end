import { User } from "../../stakeholders/model/user.model";
import { Company } from "./company.model";

export interface CompanyAdmin extends User{
    company: Company
}