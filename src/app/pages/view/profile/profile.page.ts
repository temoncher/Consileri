import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: User = new User();

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.user = this.auth.getUserCustomData();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
