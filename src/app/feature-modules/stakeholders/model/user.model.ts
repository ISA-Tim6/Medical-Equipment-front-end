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
  isActive:boolean;
}
export enum Employment {
  DOCTOR,
	PHARMACIST,
	OTHER
}

export enum Category {
  REGULAR = 0,
  SILVER = 1,
  GOLD = 2,
}
