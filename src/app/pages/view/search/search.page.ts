import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SearchService } from 'src/app/core/search.service';
import { SearchType } from 'src/app/models/search-type.enum';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  searchbarIcon = 'contacts';
  searchbarText = 'Поиск по клубам';

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
    this.searchbarIcon = 'contacts';
    this.searchbarText = 'Поиск по клубам';
    this.searchChanged();
  }
  typePlayer() {
    this.type = SearchType.players;
    this.searchbarIcon = 'contact';
    this.searchbarText = 'Поиск по игрокам';
    this.searchChanged();
  }
  typeGame() {
    this.type = SearchType.game;
    this.searchbarIcon = 'play';
    this.searchbarText = 'Поиск по играм';
    this.searchChanged();
  }
}
