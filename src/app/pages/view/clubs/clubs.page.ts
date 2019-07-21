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

  clubs: Club[] = [];

  constructor( private clubsService: ClubsService,
               private auth: AuthService) { }

  ngOnInit() {
    console.log('clubs page ngOnInit');
  }

  ionViewWillEnter() {
    console.log('clubs page ionViewWillEnter');
    this.clubsService.getClubsByUserId(this.auth.userCustom.id);
  }
}
