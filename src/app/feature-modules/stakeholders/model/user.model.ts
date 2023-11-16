export interface RegistratedUser {
  user_id?: number;
  email: string;
  username: string;
  password: string;
  name: string;
  surname: string;
  city: string;
  country: string;
  phoneNumber: string;
  employment: number;
  infoAboutInstitution: string;
  loggedBefore: boolean;
  penals?: number;
  category?: Category;
}
export enum Employment {
  COMPANY_ADMIN,
  SISTEM_ADMIN,
}

export enum Category {
  REGULAR = 0,
  SILVER = 1,
  GOLD = 2,
}
