import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';

import { AuthService } from './auth.service';
import { Club } from '../models/club';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ClubsService {

  club: Observable<Club>;
  user: any;

  constructor( private auth: AuthService,
               private afs: AngularFirestore,
               private router: Router) {
    auth.getUser().then((currentUser) => this.user = currentUser);
  }

  createClub(clubName: string) {
    const data: Club = {
      type: 'club',
      id: '',
      name: clubName,
      rating: 0,
      creator: this.user.uid,
      members: [this.user.uid]
    };
    return this.afs.collection('club').add(data).then((docRef) => {
      docRef.update({uid: docRef.id});
      this.router.navigate(['./view/clubs']);
  });
  }

  joinClub(clubId: string) {
    const clubRef: AngularFirestoreDocument<Club> = this.afs.collection('club').doc(clubId);
    clubRef.update({
      members: firebase.firestore.FieldValue.arrayUnion(this.user.uid)
    });
    const userRef: AngularFirestoreDocument<User> = this.afs.collection('user').doc(this.user.uid);
    userRef.update({
      clubs: firebase.firestore.FieldValue.arrayUnion(clubId)
    });
    this.router.navigate(['./view/clubs']);
  }

  getAllClubs() {
// tslint:disable-next-line: prefer-const
    let allClubs = [];
    this.afs.collection('club').get().toPromise().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        allClubs.push(doc.data());
      });
    });
    return allClubs;
  }
}
