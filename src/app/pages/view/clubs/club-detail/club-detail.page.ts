import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';

import { ClubsService } from 'src/app/core/clubs.service';
import { AuthService } from 'src/app/core/auth.service';

import { Club } from 'src/app/models/club';
import { User } from 'src/app/models/user';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUniqueMemberValidator } from 'src/app/models/validators/firebase-unique-member-validator';

@Component({
  selector: 'app-club-detail',
  templateUrl: './club-detail.page.html',
  styleUrls: ['./club-detail.page.scss'],
})
export class ClubDetailPage implements OnInit {

  joinForm: FormGroup;
  club: Club = new Club();
  user: User;
  isMember = false;
  isCreator = false;
  overlayHidden = true;

  constructor(private clubService: ClubsService,
              private navController: NavController,
              private auth: AuthService,
              private activatedRoute: ActivatedRoute,
              private afs: AngularFirestore,
              private fb: FormBuilder) { }

  async ngOnInit() {
    this.auth.user.subscribe(user => {
      this.user = user;
    });
    await this.activatedRoute.paramMap.subscribe(
      async paramMap => {
        if (!paramMap.has('clubId')) {
          this.navController.navigateBack('/view/clubs');
          return;
        } else {
          this.club = await this.clubService.getClub(paramMap.get('clubId'));
          this.user.clubs.forEach(club => {
            if (club.id === paramMap.get('clubId')) {
              this.isMember = true;
            }
          });
          if (this.club.creator.id === this.user.id) {
            this.isCreator = true;
          }
        }
      }
    );
  }

  get nickName() {
    return this.joinForm.get('nickName');
  }

  openOverlay() {
    this.joinForm = this.fb.group({
      nickName: [this.user.nickName,
        Validators.required,
        FirebaseUniqueMemberValidator.options(this.afs, this.club.id)]
    });
    this.overlayHidden = false;
  }
  closeOverlay(event) {
    if (!(event.target).closest('#card')) {
      this.overlayHidden = true;
    }
  }

  joinClub() {
    if (this.club.options.isPublic) {
      this.clubService.joinClub(this.club.id, this.joinForm.value);
    } else {
      // this.clubService.notifyAdmin(this.club.id, this.joinForm.value);
    }
  }

  leaveClub() {
    this.clubService.leaveClub(this.club.id).then(() => this.isMember = false);
  }
}
