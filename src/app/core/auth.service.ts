import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User>;
  userCustom: User;
  private isLoggedIn = false;

  constructor( private afAuth: AngularFireAuth,
               private afs: AngularFirestore,
               private router: Router) {

  // Get auth datam then get firestore user document || null
  console.log(this.afAuth.auth.currentUser);
  if (this.afAuth.auth.currentUser) {
    this.isLoggedIn = true;
  }

  this.getUser()
  .then((user) => {
      this.afs.collection('user').doc(user.uid)
        .get().toPromise().then((documentSnapshot) => {
            this.userCustom = documentSnapshot.data() as User;
        });
    });
  /*
  this.user = this.afAuth.authState
    .pipe(
      switchMap( user => {
        if (user) {
          console.log(user);
          this.isLoggedIn = true;
          return this.afs.doc<User>('user/' + user.uid).valueChanges();
        } else {
          console.log('user is null');
          this.isLoggedIn = false;
          return of(null);
        }
      })
    );
    */
  }

  getUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  getUserCustomData() {
    return this.userCustom;
  }

  emailLogin(userEmail: string, userPassword: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(userEmail, userPassword)
      .then(() => {
        this.isLoggedIn = true;
        this.router.navigate(['/view/play']);
      });
  }

  logout() {
    return this.afAuth.auth.signOut()
      .then(() => this.isLoggedIn = false);
  }

  authenticated() {
    return this.isLoggedIn;
  }

  emailRegister(userPhotoURL: string, userNickName: string, userEmail: string, userPassword: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(userEmail, userPassword)
      .then((credential) => {
        this.updateUserDataByEmail(credential.user.uid, userPhotoURL, userNickName, userEmail);
        this.router.navigate(['/login']);
      });
  }

  private updateUserDataByEmail(userUid: string, userPhotoURL: string, userNickName: string, userEmail: string) {
    console.log('updating user data...');
    const userRef: AngularFirestoreDocument<User> = this.afs.doc('user/' + userUid);
    const data: User = {
      uid: userUid,
      email: userEmail,
      clubs: [],
      nickName: userNickName,
      photoURL: userPhotoURL
    };
    return userRef.set(data);
  }

  // oAuth login system
  /*
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        updateUserData*(credential.user);
      });
  }

  private updateUserData(user: User) {
    console.log('updating user data...');
    const userRef: AngularFirestoreDocument<User> = this.afs.doc('user/'+ user.uid);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };
    return userRef.set(data);
  }
  */
}
