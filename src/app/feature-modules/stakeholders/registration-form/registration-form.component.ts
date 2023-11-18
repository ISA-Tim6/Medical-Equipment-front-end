import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Category, RegistratedUser } from '../model/user.model';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent implements OnChanges {
  selected:any;
  parts:any;
  onSelectEmployment(e:any): void {
    console.log(e.target.value);
    this.parts=e.target.value.split(":");
    this.selected=this.parts[0];
  }
  constructor(private userService: UserService, private router: Router) {}
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }
  public repeat = '';
  employments = [
    { value: 2, label: 'DOCTOR' },
    { value: 3, label: 'PHARMACIST' },
    { value: 4, label: 'OTHER' },
  ];
  
  
  registrationForm= new FormGroup({
    email: new FormControl('',[Validators.required]),
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    name: new FormControl('',[Validators.required]),
    surname: new FormControl('',[Validators.required]),
    city: new FormControl('',[Validators.required]),
    country: new FormControl('',[Validators.required]),
    phoneNumber: new FormControl('',[Validators.required]),
    employment: new FormControl('DOCTOR'),
    infoAboutInstitution: new FormControl('',[Validators.required]),
  })
  
  user: RegistratedUser = {
    email: '',
    password: '',
    name: '',
    username: '',
    surname: '',
    city: '',
    country: '',
    phoneNumber: '',
    employment: this.employments[0].value,
    infoAboutInstitution: '',
    loggedBefore: false,
    category: Category.REGULAR,
    penals: 0,
    isActive:false
  };

  public registerUser():void {
    const user: RegistratedUser = {
      email: this.registrationForm.value.email || '',
      password: this.registrationForm.value.password || '',
      name: this.registrationForm.value.name || '',
      username: this.registrationForm.value.username || '',
      surname: this.registrationForm.value.surname || '',
      city: this.registrationForm.value.city || '',
      country: this.registrationForm.value.country || '',
      phoneNumber: this.registrationForm.value.phoneNumber || '',
      employment: this.registrationForm.value.employment ? parseInt(this.selected, 10) : 0,
      infoAboutInstitution: this.registrationForm.value.infoAboutInstitution || '',
      loggedBefore: this.user!.loggedBefore,
      penals: this.user!.penals,
      category: this.user!.category,
      isActive:false
    };
      this.user.infoAboutInstitution=this.registrationForm.get('infoAboutInstitution')!.value || "";
      this.userService.registerUser(this.user).subscribe((response:any)=>{
          if (response.status === "success") {
            alert("Email successfully sent.")
          } 
          this.registrationForm.reset();
        },
        (error: HttpErrorResponse) => {
          console.error("Registration failed:", error);
          alert("Invalid data.")
        }

        
      );
 
  }

  get name() {
    return this.registrationForm.get('name');
  }

  get surname() {
    return this.registrationForm.get('surname');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get city() {
    return this.registrationForm.get('city');
  }

  get country() {
    return this.registrationForm.get('country');
  }

  get phoneNumber() {
    return this.registrationForm.get('phoneNumber');
  }

  get employment(){
    return this.registrationForm.get('employment'); 
  }

  get infoAboutInstitution() {
    return this.registrationForm.get('infoAboutInstitution');
  }
  get username() {
    return this.registrationForm.get('username');
  }

  public isValid(name:string){
    let sampleRegEx: RegExp = /[A-Z][A-Za-z]+/;
    return sampleRegEx.test(name);
  }

  public isValidEmail(email: string) {
    let sampleRegEx: RegExp =
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return sampleRegEx.test(email);
  }

  repeatPassword(e: any) {
    this.repeat = e.target.value;
  }

  isRepatPasswordIsEmpty() {
    let repeatPsswordIsEmpty: boolean = true;
    if (this.repeat.length > 0) repeatPsswordIsEmpty = false;
    return repeatPsswordIsEmpty;
  }

  isPasswordCorrect() {
    let isCorrectPassword: boolean = false;
    if (this.repeat === this.registrationForm.value.password)
      isCorrectPassword = true;

    return isCorrectPassword;
  }
  isPhoneNumberValid(){
    let isValidPhoneNumber:boolean=false;
    let sampleRegEx: RegExp = /[0-9]+/;
    if(sampleRegEx.test(this.user.phoneNumber))
      if(this.user.phoneNumber.length>3)
        isValidPhoneNumber=true;

    return isValidPhoneNumber;
  }
  

  

  isAllValid(){
    let allIsValid:boolean = false;
    let nameValid:boolean = false;
    let surnameValid:boolean = false;
    let emailValid:boolean = false;
    let longPasswordValid:boolean = false;
    let passwordCorrect:boolean = false;
    let genderValid:boolean=false;
    let phoneValid:boolean = false;
    
    if((this.isValid(this.user.name)))
        nameValid=true;

    if(this.isValid(this.user.email))
      surnameValid=true;

    if (this.isValidEmail(this.user.email)) emailValid = true;

    if (this.isPasswordCorrect()) passwordCorrect = true;

    if (this.isPhoneNumberValid()) phoneValid = true;

    allIsValid =
      nameValid &&
      surnameValid &&
      emailValid &&
      passwordCorrect &&
      phoneValid;
    return allIsValid;
  }
 
}
