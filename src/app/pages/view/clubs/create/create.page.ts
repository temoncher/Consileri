import { Component, OnInit } from '@angular/core';
import { ClubsService } from 'src/app/core/clubs.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { debounceTime, take, map } from 'rxjs/operators';

export class FirebaseClubNameUniqueValidator {
  static username(afs: AngularFirestore) {
    return (control: AbstractControl) => {
      const username = control.value;

      return afs.collection('club', ref => ref.where('name', '==', username))
        .valueChanges().pipe(
          debounceTime(1000),
          take(1),
          map(arr => arr.length ? { usernameAvalible: false } : null)
        );
    };
  }
}

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  clubForm: FormGroup;

  constructor(public clubs: ClubsService,
              private fb: FormBuilder,
              private afs: AngularFirestore) { }

  ngOnInit() {
    this.clubForm = this.fb.group({
      name: ['',
        Validators.required,
        FirebaseClubNameUniqueValidator.username(this.afs)
      ],
      // tslint:disable-next-line: max-line-length
      imgURL: 'https://firebasestorage.googleapis.com/v0/b/consileriapp.appspot.com/o/shared%2Fclub.png?alt=media&token=0cf33cf0-98d6-4ec7-b88c-40a5e759f934'
    });
  }

  get name() {
    return this.clubForm.get('name');
  }

  async createClub() {
    this.clubs.createClub(this.clubForm.value);
  }

}
