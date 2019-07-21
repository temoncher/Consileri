import { Router } from '@angular/router';
import { Injectable, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

import { AuthService } from './auth.service';
import { Club } from '../models/club';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ClubsService implements OnInit {

  private user: User;

  constructor( private auth: AuthService,
               private afs: AngularFirestore,
               private loadCtrl: LoadingController,
               private router: Router) { }

  ngOnInit() {
    // this.user = this.auth.getUserCustomData();
    this.auth.user.subscribe(user => this.user = user);
  }

  async getClub(clubId: string) {
    let foundClub;
    await this.afs.collection('club').doc(clubId).get().toPromise().then((documentSnapshot) => {
      foundClub = documentSnapshot.data();
    });
    return foundClub;
  }

  getClubsByUserId(userId: string) {
    console.log('getClubsByUserId started');
    return new Promise<Club[]> (async (resolve, reject) => {
      // tslint:disable-next-line: prefer-const
      let queriedClubs = [];
      await this.afs.collection('club').ref.where('members', 'array-contains', userId).get()
        .then((querySnapshot) => {
          console.log('querySnapshot aquired');
          querySnapshot.forEach((docSnapshot) => {
            queriedClubs.push(docSnapshot.data);
          });
        });
      console.log('resolving');
      resolve(queriedClubs);
      reject('Error occured');
    });
  }

  async createClub(clubName: string) {
    // const data: Club = new Club('', clubName, this.user.id, [this.user.id]);
    const data: Club = {
      type: 'club',
      id: '',
      name: clubName,
      rating: 0,
      creator: this.user.id,
      members: [this.user.id]
    };
    let clubId = '';
    this.loadCtrl.create({
      message: 'Создаем ваш новый клуб...',
    }).then(async (loadingEl) => {
      loadingEl.present();
      await this.afs.collection('club').add(data).then((docRef) => {
        docRef.update({id: docRef.id});
        clubId = docRef.id;
      });
      await this.afs.collection('user').doc(this.user.id).update({
        clubs: firebase.firestore.FieldValue.arrayUnion(clubId)
      }).then(() => this.router.navigate(['./view/clubs']).then(() => loadingEl.dismiss()));
    });
  }

  joinClub(clubId: string) {
    console.log('Entering joinClub');
    const clubRef: AngularFirestoreDocument<Club> = this.afs.collection('club').doc(clubId);
    clubRef.update({
      members: firebase.firestore.FieldValue.arrayUnion(this.user.id)
    });
    console.log('Club member added to club card');
    const userRef: AngularFirestoreDocument<User> = this.afs.collection('user').doc(this.user.id);
    userRef.update({
      clubs: firebase.firestore.FieldValue.arrayUnion(clubId)
    });
    console.log('Club added to user clubs');
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
