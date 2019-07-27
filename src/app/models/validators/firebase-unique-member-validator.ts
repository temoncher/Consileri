import { AbstractControl } from '@angular/forms';
import { debounceTime, take, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Club } from '../club';

export class FirebaseUniqueMemberValidator {
  static options(afs: AngularFirestore, clubId: string) {
    return (control: AbstractControl) => {
      const username = control.value;

      return afs.collection('club', ref => ref.where('id', '==', clubId))
        .valueChanges().pipe(
          debounceTime(1000),
          take(1),
          map(arr => {
            if (arr.length === 1) {
              const members = (arr[0] as Club).members as Array<any>;
              if (members.find((user) => user.nickName === username)) {
                return { usernameAvalible: false };
              } else {
                return null;
              }
            } else {
              if (arr.length === 0) {
                console.log('No results for this club ID');
              } else {
                console.log('Multiple results for club ID');
              }
            }
          })
        );
    };
  }
}
