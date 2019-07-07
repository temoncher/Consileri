import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  Email: '';
  Password: '';
  NickName: '';

  constructor( public auth: AuthService) { }

  ngOnInit() {
  }

  async register() {
    this.auth.emailRegister('', this.NickName, this.Email, this.Password);
  }

}
