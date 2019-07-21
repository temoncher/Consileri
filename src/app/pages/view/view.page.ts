import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  user: User = new User();

  constructor(private auth: AuthService) { }

  ngOnInit() {
    // await this.auth.checkLoggedIn;
    this.user = this.auth.userCustom;
    console.log(this.user);
  }

}
