import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StakeholdersService } from '../stakeholders.service';
import { Category, Employment, RegistratedUser } from '../model/user.model';
import { User } from '../model/main-user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnChanges, OnInit {
  employments = [
    { value: 2, label: 'DOCTOR' },
    { value: 3, label: 'PHARMACIST' },
    { value: 4, label: 'OTHER' },
  ];
  selected: string = this.employments[0].value.toString();
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
    isActive: false,
  };

  constructor(private service: StakeholdersService) {}

  editMode = false;

  employmentForm = new FormGroup({
    employment: new FormControl('', [Validators.required]),
  });

  userForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Z][A-Za-z ]*$/),
    ]),
    surname: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Z][A-Za-z ]*$/),
    ]),
    city: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Z][A-Za-z ]*$/),
    ]),
    country: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Z][A-Za-z ]*$/),
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{9,10}$/),
    ]),
    infoAboutInstitution: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.service.getUser().subscribe({
      next: (result: RegistratedUser) => {
        console.log(result);
        this.user = result;
        this.selected =
          this.employments
            .find((emp) => emp.label == this.user.employment.toString())
            ?.value.toString() || '';
      },
    });
  }

  ngOnChanges(changes: SimpleChanges): void {}
  onEditMode() {
    this.editMode = true;
    this.userForm.reset();
    this.userForm.patchValue(this.user);
    this.userForm.patchValue({
      confirmPassword: this.user.password,
    });
    this.selected =
      this.employments
        .find((emp) => emp.label == this.user.employment.toString())
        ?.value.toString() || '';
  }

  updateProfile(): void {
    if (this.isInputValid) {
      var oldUsername = this.user.username;
      const user: RegistratedUser = {
        user_id: this.user!.user_id,
        email: this.user!.email,
        password: this.userForm.value.password || '',
        name: this.userForm.value.name || '',
        username: this.userForm.value.username || '',
        surname: this.userForm.value.surname || '',
        city: this.userForm.value.city || '',
        country: this.userForm.value.country || '',
        phoneNumber: this.userForm.value.phoneNumber || '',
        employment: this.selected ? parseInt(this.selected, 10) : 0,
        infoAboutInstitution: this.userForm.value.infoAboutInstitution || '',
        loggedBefore: this.user!.loggedBefore,
        penals: this.user!.penals,
        category: this.user!.category,
        isActive: false,
      };
      this.service.getByUsername(user.username).subscribe({
        next: (result: User) => {
          if (result == null || result.user_id == user.user_id) {
            this.service.updateUser(user, oldUsername).subscribe({
              next: (result: RegistratedUser) => {
                if (result == null) alert('Please enter valid data.');
                else {
                  this.user = result;
                  this.editMode = false;
                }
              },
            });
          } else alert('Username already exists.');
        },
      });
    } else alert('Please enter valid data.');
  }

  get isUsernameInvalid(): boolean {
    const usernameControl = this.userForm.get('username');
    return (
      !!usernameControl &&
      usernameControl.invalid &&
      (usernameControl.dirty || usernameControl.touched)
    );
  }

  get isNameInvalid(): boolean {
    const nameControl = this.userForm.get('name');
    return (
      !!nameControl &&
      nameControl.invalid &&
      (nameControl.dirty || nameControl.touched)
    );
  }

  get isSurnameInvalid(): boolean {
    const surnameControl = this.userForm.get('surname');
    return (
      !!surnameControl &&
      surnameControl.invalid &&
      (surnameControl.dirty || surnameControl.touched)
    );
  }

  get isCityInvalid(): boolean {
    const cityControl = this.userForm.get('city');
    return (
      !!cityControl &&
      cityControl.invalid &&
      (cityControl.dirty || cityControl.touched)
    );
  }

  get isCountryInvalid(): boolean {
    const countryControl = this.userForm.get('country');
    return (
      !!countryControl &&
      countryControl.invalid &&
      (countryControl.dirty || countryControl.touched)
    );
  }

  get isNumberInvalid(): boolean {
    const numberControl = this.userForm.get('phoneNumber');
    return (
      !!numberControl &&
      numberControl.invalid &&
      (numberControl.dirty || numberControl.touched)
    );
  }

  get areInfoInvalid(): boolean {
    const infoControl = this.userForm.get('infoAboutInstitution');
    return (
      !!infoControl &&
      infoControl.invalid &&
      (infoControl.dirty || infoControl.touched)
    );
  }

  get isPasswordInvalid(): boolean {
    const passwordControl = this.userForm.get('password');
    return (
      !!passwordControl &&
      passwordControl.invalid &&
      (passwordControl.dirty || passwordControl.touched)
    );
  }

  get isConfirmPasswordInvalid(): boolean {
    const passwordControl = this.userForm.get('password');
    const confirmPasswordControl = this.userForm.get('confirmPassword');
    return (
      !!passwordControl &&
      !!confirmPasswordControl &&
      passwordControl.value !== confirmPasswordControl.value
    );
  }

  get isInputValid(): boolean {
    return (
      !this.isNameInvalid &&
      !this.isSurnameInvalid &&
      !this.isUsernameInvalid &&
      !this.isPasswordInvalid &&
      !this.isConfirmPasswordInvalid &&
      !this.areInfoInvalid &&
      !this.isNumberInvalid &&
      !this.isCityInvalid &&
      !this.isCountryInvalid
    );
  }

  getCategory(category: Category | undefined): string {
    if (category === undefined) {
      return 'N/A';
    }
    switch (category.toString()) {
      case 'REGULAR':
        return 'REGULAR';
      case 'SILVER':
        return 'SILVER';
      case 'GOLD':
        return 'GOLD';
      default:
        return '';
    }
  }
}
