import { Address } from "./address.model";

export interface Company{
    company_id?: number,
    name: string,
    address: Address
}