import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnChanges {
  @Input() user: User | undefined;

  editMode = false;

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    employment: new FormControl('', [Validators.required]),
    infoAboutInstitution: new FormControl('', [Validators.required]),
  });

  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }
  onEditMode() {
    this.editMode = !this.editMode;
  }

  updateProfile(): void {
    if (this.editMode) {
      const user: User = {
        email: this.user!.email,
        password: this.userForm.value.password || '',
        name: this.userForm.value.name || '',
        surname: this.userForm.value.surname || '',
        city: this.userForm.value.city || '',
        country: this.userForm.value.country || '',
        phoneNumber: this.userForm.value.phoneNumber || '',
        employment: this.userForm.value.employment || '',
        infoAboutInstitution: this.userForm.value.infoAboutInstitution || '',
        loggedBefore: this.user!.loggedBefore,
      };

      /*this.service.updateProfile(user).subscribe({
        next: () => {
          this.reviewsUpdated.emit();
        },
      });*/
    }
  }
}
