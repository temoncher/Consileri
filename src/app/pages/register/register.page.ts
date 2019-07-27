import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseUniqueLowerCaseValidator } from 'src/app/models/validators/firebase-unique-lower-case-validator';

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
        Validators.required
      ],
      email: ['', [
        Validators.required,
        Validators.email
      ],
        FirebaseUniqueLowerCaseValidator.options(this.afs, 'user', 'email')
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

