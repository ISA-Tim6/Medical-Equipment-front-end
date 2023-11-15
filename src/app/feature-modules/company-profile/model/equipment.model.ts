import { Company } from "./company.model";

export interface Equipment {
    equipment_id?:number;
	name:string;
    description:string;
	type:string;
    companies?: Company[];
}