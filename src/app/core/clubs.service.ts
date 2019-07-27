import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

import { AuthService } from './auth.service';
import { Club } from '../models/club';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ClubsService {

  private user: User;

  constructor(private auth: AuthService,
              private afs: AngularFirestore,
              private loadCtrl: LoadingController,
              private router: Router) {

    this.auth.user.subscribe(user => {
      this.user = user;
    });
  }

  async getClub(clubId: string) {
    let foundClub;
    await this.afs.collection('club').doc(clubId).get().toPromise().then((documentSnapshot) => {
      foundClub = documentSnapshot.data();
    });
    return foundClub;
  }

  async createClub(clubInfo) {
    // const data: Club = new Club('', clubName, this.user.id, [this.user.id]);
    const data: Club = {
      type: 'club',
      id: '',
      name: clubInfo.name,
      rating: 0,
      creator: {
        id: this.user.id,
        nickName: this.user.nickName,
        photoURL: this.user.photoURL
      },
      members: [
        {
          id: this.user.id,
          nickName: this.user.nickName,
          photoURL: this.user.photoURL
        }
      ],
      imgURL: clubInfo.imgURL,
      options: {
        isPublic: false
      }
    };
    let clubId = '';
    this.loadCtrl.create({
      message: 'Создаем ваш новый клуб...',
    }).then(async (loadingEl) => {
      loadingEl.present();
      await this.afs.collection('club').add(data).then((docRef) => {
        docRef.update({ id: docRef.id });
        clubId = docRef.id;
      });
      await this.afs.collection('user').doc(this.user.id).update({
        clubs: firebase.firestore.FieldValue
          .arrayUnion(
            {
              id: clubId,
              name: clubInfo.name,
              imgURL: clubInfo.imgURL,
              clubNickName: this.user.nickName
            })
      }).then(() => this.router.navigate(['./view/clubs']).then(() => loadingEl.dismiss()));
    });
  }

  async joinClub(clubId: string, chosenNickName: string) {
    let foundClub;
    const clubRef: AngularFirestoreDocument<Club> = this.afs.collection('club').doc(clubId);
    clubRef.update({
      members: firebase.firestore.FieldValue.arrayUnion(
        {
          id: this.user.id,
          nickName: chosenNickName,
          photoURL: this.user.photoURL,
          isConsileri: false
        })
    });
    await clubRef.get().toPromise().then((documentSnapshot) => {
      foundClub = documentSnapshot.data();
    });
    const userRef: AngularFirestoreDocument<User> = this.afs.collection('user').doc(this.user.id);
    userRef.update({
      clubs: firebase.firestore.FieldValue.arrayUnion(
        {
          id: clubId,
          name: foundClub.name,
          imgURL: foundClub.imgURL,
          clubNickName: chosenNickName
        })
    });
    this.router.navigate(['./view/clubs']);
  }

  async leaveClub(clubId: string) {
    const userClubInfo = (this.user.clubs as Array<any>).find(club => club.id === clubId);
    console.log(userClubInfo);
    const clubRef: AngularFirestoreDocument<Club> = this.afs.collection('club').doc(clubId);
    clubRef.update({
      members: firebase.firestore.FieldValue.arrayRemove(
        {
          id: this.user.id,
          nickName: userClubInfo.clubNickName,
          photoURL: this.user.photoURL
        })
    });
    const userRef: AngularFirestoreDocument<User> = this.afs.collection('user').doc(this.user.id);
    userRef.update({
      clubs: firebase.firestore.FieldValue.arrayRemove(
        {
          id: clubId,
          name: userClubInfo.name,
          imgURL: userClubInfo.imgURL,
          clubNickName: userClubInfo.clubNickName
        })
    });
  }
  /*
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
  */
}
