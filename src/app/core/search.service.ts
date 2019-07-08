import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SearchType } from '../models/search-type.enum';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private afs: AngularFirestore) { }

  searchData(title: string, type: SearchType) {
    // tslint:disable-next-line: prefer-const
    let list: any[] = [];
    if (type === SearchType.all) {
      list = this.searchAll(title);
      console.log(list);
      return list;
    } else {
      const typeRef = this.afs.collection(type);
      const snap = typeRef.ref;
      snap.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          list.push(doc.data());
        });
        switch (type) {
          case 'club':
            list = list.filter(item => item.name >= title);
            break;
          case 'game':
            list = list.filter(item => item.Id >= title);
            break;
          case 'user':
            list = list.filter(item => item.nickName >= title);
            break;
          default:
            console.log('Unbelievable!');
            break;
          }
        console.log(list);
        return list;
      });
    }
  }

  private searchAll(title: string) {
    // tslint:disable-next-line: prefer-const
    let list: any[] = [];
    list = list.concat(this.searchData(title, SearchType.clubs));
    list = list.concat(this.searchData(title, SearchType.game));
    list = list.concat(this.searchData(title, SearchType.players));
    return list;
  }
}
