import { Component, OnInit } from '@angular/core';
import { ClubsService } from 'src/app/core/clubs.service';

import { Club } from '../../../../models/club';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  clubs: Club[];

  constructor( public clubsService: ClubsService) {
    this.clubs = clubsService.getAllClubs();
  }

  ngOnInit() {
  }

}
