import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  Email: '';
  Password: '';

  constructor( public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  async register() {
    const user = await this.afAuth.auth.createUserWithEmailAndPassword(this.Email, this.Password);
    console.log(user);
  }

}
