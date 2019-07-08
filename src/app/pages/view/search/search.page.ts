import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/core/search.service';
import { SearchType } from 'src/app/models/search-type.enum';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  results: any[];

  searchTerm = '';
  type: SearchType = SearchType.all;

  constructor(private search: SearchService) { }

  ngOnInit() {
  }

  searchChanged() {
    this.results = this.search.searchData(this.searchTerm, this.type);
    console.log(this.results);
  }

  typeAll() {
    this.type = SearchType.all;
    this.searchChanged();
  }
  typeClub() {
    this.type = SearchType.clubs;
    this.searchChanged();
  }
  typeGame() {
    this.type = SearchType.game;
    this.searchChanged();
  }
  typePlayer() {
    this.type = SearchType.players;
    this.searchChanged();
  }

}
