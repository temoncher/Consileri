import { Component, OnInit } from '@angular/core';
import { ClubsService } from 'src/app/core/clubs.service';
import { NavController } from '@ionic/angular';
import { Club } from 'src/app/models/club';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-club-detail',
  templateUrl: './club-detail.page.html',
  styleUrls: ['./club-detail.page.scss'],
})
export class ClubDetailPage implements OnInit {

  club: Club = new Club();

  constructor(private clubService: ClubsService,
              private navController: NavController,
              private activatedRoute: ActivatedRoute) { }

  async ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      async paramMap => {
        if (!paramMap.has('clubId')) {
          this.navController.navigateBack('/view/clubs');
          return;
        } else {
          this.club = await this.clubService.getClub(paramMap.get('clubId'));
        }
      }
    );
  }

  joinClub() {
    // this.clubService.joinClub();
    this.navController.navigateBack('/view/clubs');
  }

}
