import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StakeholdersService } from '../stakeholders.service';
import { Employment, User } from '../model/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnChanges, OnInit {
  selected: string = '';
  employments = [
    { value: '0', label: 'COMPANY_ADMIN' },
    { value: '1', label: 'SISTEM_ADMIN' },
  ];

  user: User = {
    email: '',
    password: '',
    name: '',
    username: '',
    surname: '',
    city: '',
    country: '',
    phoneNumber: '',
    employment: 0,
    infoAboutInstitution: '',
    loggedBefore: false,
  };

  constructor(private service: StakeholdersService) {}

  editMode = false;

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    infoAboutInstitution: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.service.getUser().subscribe({
      next: (result: User) => {
        this.user = result;
      },
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }
  onEditMode() {
    if (this.editMode) this.updateProfile();
    this.editMode = !this.editMode;
  }

  updateProfile(): void {
    const user: User = {
      email: this.user!.email,
      password: this.userForm.value.password || '',
      name: this.userForm.value.name || '',
      username: this.userForm.value.username || '',
      surname: this.userForm.value.surname || '',
      city: this.userForm.value.city || '',
      country: this.userForm.value.country || '',
      phoneNumber: this.userForm.value.phoneNumber || '',
      employment: this.selected ? parseInt(this.selected, 2) : 0,
      infoAboutInstitution: this.userForm.value.infoAboutInstitution || '',
      loggedBefore: this.user!.loggedBefore,
    };
    this.service.updateUser(user).subscribe({
      next: (result: User) => {
        this.user = result;
      },
    });
  }
}
