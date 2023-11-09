export interface User {
  id?: number;
  email: string;
  password: string;
  name: string;
  surname: string;
  city: string;
  country: string;
  phoneNumber: string;
  employment: string;
  infoAboutInstitution: string;
  loggedBefore: boolean;
}
