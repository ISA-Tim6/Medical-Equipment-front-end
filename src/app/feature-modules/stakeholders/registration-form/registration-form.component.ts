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
import { RegistratedUser } from '../model/user.model';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent implements OnChanges {
  constructor(private userService: UserService, private router: Router) {}
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }
  public repeat = '';
  selected: string = '';
  employments = [
    { value: '0', label: 'COMPANY_ADMIN' },
    { value: '1', label: 'SISTEM_ADMIN' },
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
    infoAboutInstitution: new FormControl('',[Validators.required]),
  })
  
   user : RegistratedUser= {
    email: this.registrationForm.value.email || "",
    username:this.registrationForm.value.username || "",
    password: this.registrationForm.value.password || "",
    name: this.registrationForm.value.name || "",
    surname: this.registrationForm.value.surname || "",
    city: this.registrationForm.value.city || "",
    country: this.registrationForm.value.country || "",
    phoneNumber: this.registrationForm.value.phoneNumber || "",
    employment: this.selected
                ? parseInt(this.selected, 2)
                : 0,
    infoAboutInstitution: this.registrationForm.value.infoAboutInstitution || "",
    loggedBefore: false,
    penals: 0,
    category: 0
  };

  public registerUser(event: Event) {
    event.preventDefault();

      
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

  public isLongPassword(password: string) {
    let isLong: boolean = false;
    if (password.length >= 5) isLong = true;

    return isLong;
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

    if (this.isLongPassword(this.user.password)) longPasswordValid = true;

    if (this.isPasswordCorrect()) passwordCorrect = true;

    if (this.isPhoneNumberValid()) phoneValid = true;

    allIsValid =
      nameValid &&
      surnameValid &&
      emailValid &&
      longPasswordValid &&
      passwordCorrect &&
      phoneValid;
    return allIsValid;
  }
}
