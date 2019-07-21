import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  Email = '';
  Password = '';
  NickName = '';
  imageURL = '';

  constructor( public auth: AuthService) { }

  ngOnInit() {
  }

  async register() {
// tslint:disable-next-line: max-line-length
    this.imageURL = 'https://firebasestorage.googleapis.com/v0/b/consileriapp.appspot.com/o/shared%2Favatar.svg?alt=media&token=3bf18884-7ca2-406f-8235-3da322f4b8b2';
    this.auth.emailRegister(this.imageURL, this.NickName, this.Email, this.Password);
  }

}
