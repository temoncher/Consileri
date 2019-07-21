import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage {

  constructor(public auth: AuthService) { }

}
