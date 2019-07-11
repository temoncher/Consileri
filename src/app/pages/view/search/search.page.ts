import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/core/search.service';
import { SearchType } from 'src/app/models/search-type.enum';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  results: any;

  searchTerm = '';
  type: SearchType = SearchType.clubs;

  constructor(private search: SearchService) { }

  ngOnInit() {
  }

  async searchChanged() {
    this.results = await this.search.searchData(this.searchTerm.toLowerCase(), this.type);
  }

  typeClub() {
    this.type = SearchType.clubs;
    this.searchChanged();
  }
  typePlayer() {
    this.type = SearchType.players;
    this.searchChanged();
  }
  typeGame() {
    this.type = SearchType.game;
    this.searchChanged();
  }
}
