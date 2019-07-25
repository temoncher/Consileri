import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { User } from '../models/user';
import { LoadingController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User>;
  private isLoggedIn = false;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private loadCtrl: LoadingController,
              private router: Router) {
    this.user = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.collection('user').doc<User>(user.uid).valueChanges();
        } else {
          console.log('User is logged out or missing');
          return of(null);
        }
      })
    );

    /*
    this.afAuth.authState.pipe(
      map((user) => {
        if (user) {
          this.afs.collection('user').doc<User>(user.uid).valueChanges().subscribe(userCustom => this.user = userCustom);
        } else {
          console.log('User is logged out or missing');
        }
      })
    );
    */
  }

  emailLogin(credentials) {
    this.loadCtrl.create({ message: 'Выполняем вход...' }).then((loadingEl) => {
      loadingEl.present();
      return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(() => {
          this.isLoggedIn = true;
          this.router.navigate(['/view/play']).then(() => loadingEl.dismiss());
        });
    });
  }

  logout() {
    return this.afAuth.auth.signOut()
      .then(() => this.isLoggedIn = false);
  }

  authenticated() {
    return this.isLoggedIn;
  }

  emailRegister(credentials) {
    console.log(credentials.imageURL);
    this.loadCtrl.create({ message: 'Создаем ваш аккаунт...' }).then((loadingEl) => {
      loadingEl.present();
      return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
        .then((credential) => {
          this.updateUserDataByEmail(credential.user.uid, credentials.imageURL, credentials.nickName, credentials.email.toLowerCase());
          this.router.navigate(['/login']).then(() => loadingEl.dismiss());
        });
    });
  }

  private updateUserDataByEmail(userUid: string, userPhotoURL: string, userNickName: string, userEmail: string) {
    console.log('updating user data...');
    console.log(userPhotoURL);
    const userRef: AngularFirestoreDocument<User> = this.afs.doc('user/' + userUid);
    // const data: User = new User(userUid, userEmail, userNickName, userPhotoURL);
    const data: User = {
      type: 'user',
      id: userUid,
      email: userEmail,
      clubs: [],
      nickName: userNickName,
      photoURL: userPhotoURL,
      notificationCount: 0
    };
    return userRef.set(data);
  }

  deleteAccount() {
    this.afs.doc('user/' + this.afAuth.auth.currentUser.uid).delete();
    this.afAuth.auth.currentUser.delete().then(() => this.router.navigate(['/login']));
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
