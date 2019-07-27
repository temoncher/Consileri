import { Injectable } from '@angular/core';
import { AngularFirestore, Query } from '@angular/fire/firestore';
import { SearchType } from '../models/search-type.enum';

@Injectable({
  providedIn: 'root'
})
export class SearchService {


  constructor(private afs: AngularFirestore) { }

  async searchData(title: string, type: SearchType) {
    // tslint:disable-next-line: prefer-const
    let result = [];
    const fetched = await this.getData(type.toString());
    switch (type.toString()) {
      case 'all':
        break;
      case 'club':
        fetched.forEach(club => {
          if (club.name.toLowerCase().includes(title)) {
            result.push(club);
          }
        });
        break;
      case 'game':
        fetched.forEach(game => {
          if (game.id.toLowerCase().includes(title)) {
            result.push(game);
          }
        });
        break;
      case 'user':
        fetched.forEach(user => {
          if (user.nickName.toLowerCase().includes(title)) {
            result.push(user);
          }
        });
        break;
      default:
        break;
    }
    return result;
  }

  async getData(type: string) {
    // tslint:disable-next-line: prefer-const
    let data = [];
    await this.afs.collection(type).get().toPromise().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
    });
    return data;
  }
}
