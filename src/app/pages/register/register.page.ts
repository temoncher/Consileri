import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { debounceTime, take, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

export class FirebaseNicknameUniqueValidator {
  static username(afs: AngularFirestore) {
    return (control: AbstractControl) => {
      const username = control.value;

      return afs.collection('user', ref => ref.where('nickName', '==', username))
        .valueChanges().pipe(
          debounceTime(1000),
          take(1),
          map(arr => arr.length ? { usernameAvalible: false } : null)
        );
    };
  }
}

export class FirebaseEmailUniqueValidator {
  static email(afs: AngularFirestore) {
    return (control: AbstractControl) => {
      const email = control.value.toLowerCase();

      return afs.collection('user', ref => ref.where('email', '==', email))
        .valueChanges().pipe(
          debounceTime(1000),
          take(1),
          map(arr => arr.length ? { emailAvalible: false } : null)
        );
    };
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  constructor(public auth: AuthService,
              private fb: FormBuilder,
              private afs: AngularFirestore) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      nickName: ['',
        Validators.required,
        FirebaseNicknameUniqueValidator.username(this.afs)
      ],
      email: ['', [
        Validators.required,
        Validators.email
      ],
        FirebaseEmailUniqueValidator.email(this.afs)
      ],
      // tslint:disable-next-line: max-line-length
      imageURL: ['https://firebasestorage.googleapis.com/v0/b/consileriapp.appspot.com/o/shared%2Favatar.svg?alt=media&token=3bf18884-7ca2-406f-8235-3da322f4b8b2'],
      password: ['', [
        Validators.required
      ]]
    });
  }

  get email() {
    return this.registerForm.get('email');
  }
  get nickName() {
    return this.registerForm.get('nickName');
  }

  register() {
    this.auth.emailRegister(this.registerForm.value);
  }

}

