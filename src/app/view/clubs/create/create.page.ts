import { Component, OnInit } from '@angular/core';
import { ClubsService } from 'src/app/core/clubs.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  Name: '';

  constructor( public clubs: ClubsService) { }

  ngOnInit() {
  }

  async createClub() {
    this.clubs.createClub(this.Name);
  }

}
