import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  // user: Observable<User>;
  user: User;

  constructor(private auth: AuthService,
              private alert: AlertController,
              private router: Router) { }

  ngOnInit() {
    // this.user = this.auth.user;
    this.auth.user.subscribe(user => this.user = user);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  async presentAlert() {
    const popup = await this.alert.create({
      header: 'Удаление аккаунта',
      message: 'Вы уверены, что хотите удалить аккаунт?<br/> В таком случае вся ваша статистика будет утеряна.',
      buttons: [{
        text: 'Удалить',
        role: 'destructive',
        handler: () => {
          this.auth.deleteAccount();
        }
      },
      {
        text: 'Отмена',
        role: 'cancel'
      }]
    });

    await popup.present();

  }

}
