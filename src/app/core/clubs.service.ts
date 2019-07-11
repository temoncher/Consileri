import { Injectable, OnInit } from '@angular/core';
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

  private user: User;

  constructor( private auth: AuthService,
               private afs: AngularFirestore,
               private router: Router) {
    this.InitializeService();
  }

  InitializeService(): void {
    this.user = this.auth.getUserCustomData();
  }

  async getClub(clubId: string) {
    let foundClub;
    await this.afs.collection('club').doc(clubId).get().toPromise().then((documentSnapshot) => {
      foundClub = documentSnapshot.data();
    });
    return foundClub;
  }

  async createClub(clubName: string) {
    const data: Club = {
      type: 'club',
      id: '',
      name: clubName,
      rating: 0,
      creator: this.user.id,
      members: [this.user.id]
    };
    // tslint:disable-next-line: prefer-const
    let userClubs = this.user.clubs;
    await this.afs.collection('club').add(data).then((docRef) => {
      docRef.update({id: docRef.id});
      userClubs.push({
        name: clubName,
        id: docRef.id
      });
    });
    await this.afs.collection('user').doc(this.user.id).update({
      clubs: userClubs
    }).then(() => this.router.navigate(['./view/clubs']));
  }

  joinClub(clubId: string) {
    const clubRef: AngularFirestoreDocument<Club> = this.afs.collection('club').doc(clubId);
    clubRef.update({
      members: firebase.firestore.FieldValue.arrayUnion(this.user.id)
    });
    const userRef: AngularFirestoreDocument<User> = this.afs.collection('user').doc(this.user.id);
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
    console.log(allClubs);
    return allClubs;
  }
}
