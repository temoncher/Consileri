import { Component, OnInit } from '@angular/core';
import { ClubsService } from 'src/app/core/clubs.service';
import { NavController } from '@ionic/angular';
import { Club } from 'src/app/models/club';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-club-detail',
  templateUrl: './club-detail.page.html',
  styleUrls: ['./club-detail.page.scss'],
})
export class ClubDetailPage implements OnInit {

  club: Club = new Club();
  user: User;
  isMember = false;
  isCreator = false;

  constructor(private clubService: ClubsService,
              private navController: NavController,
              private auth: AuthService,
              private activatedRoute: ActivatedRoute) { }

  async ngOnInit() {
    this.auth.user.subscribe(user => {
      this.user = user;
    });
    await this.activatedRoute.paramMap.subscribe(
      async paramMap => {
        if (!paramMap.has('clubId')) {
          this.navController.navigateBack('/view/clubs');
          return;
        } else {
          this.club = await this.clubService.getClub(paramMap.get('clubId'));
          this.user.clubs.forEach(club => {
            if (club.id === paramMap.get('clubId')) {
              this.isMember = true;
            }
          });
          if (this.club.creator.id === this.user.id) {
            this.isCreator = true;
          }
        }
      }
    );
  }

  joinClub() {
    this.clubService.joinClub(this.club.id);
  }

  leaveClub() {
    this.clubService.leaveClub(this.club.id).then(() => this.isMember = false);
  }

}
