import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClubsPage } from './clubs.page';

const routes: Routes = [
  {
    path: '',
    component: ClubsPage,
    pathMatch: 'full'
  },
  {
    path: '',
    children: [
      { path: 'create', loadChildren: './create/create.module#CreatePageModule' },
      { path: ':clubId', loadChildren: './club-detail/club-detail.module#ClubDetailPageModule'}
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
  declarations: [ClubsPage]
})
export class ClubsPageModule {}
