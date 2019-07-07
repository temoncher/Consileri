import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  Email: '';
  Password: '';

  constructor( public auth: AuthService) { }

  ngOnInit() {
  }

  async login() {
    this.auth.emailLogin(this.Email, this.Password);
  }

}
