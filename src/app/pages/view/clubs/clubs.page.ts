import { Component, OnInit } from '@angular/core';
import { ClubsService } from 'src/app/core/clubs.service';
import { Club } from '../../../models/club';
import { AuthService } from 'src/app/core/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.page.html',
  styleUrls: ['./clubs.page.scss'],
})
export class ClubsPage implements OnInit {

  user: User = new User();

  constructor( private clubsService: ClubsService,
               private auth: AuthService) { }

  ngOnInit() {
    this.ionViewWillEnter();
  }

  ionViewWillEnter() {
    this.user = this.auth.getUserCustomData();
    console.log(this.user);
    console.log(this.user.clubs);
    console.log(!(this.user.clubs === []));
  }
}
