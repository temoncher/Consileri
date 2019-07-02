import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  Email: '';
  Password: '';

  constructor( public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  async login() {
    const user = this.afAuth.auth.signInWithEmailAndPassword(this.Email, this.Password);
    console.log(user);
  }

}
