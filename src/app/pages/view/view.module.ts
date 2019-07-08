import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewPage } from './view.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'play',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ViewPage,
    children: [
      { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
      { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
      { path: 'search', loadChildren: './search/search.module#SearchPageModule' },
      { path: 'clubs', loadChildren: './clubs/clubs.module#ClubsPageModule' },
      { path: 'play', loadChildren: './play/play.module#PlayPageModule' }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewPage]
})
export class ViewPageModule {}
