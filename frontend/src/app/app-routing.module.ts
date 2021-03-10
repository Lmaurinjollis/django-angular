import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddThreadComponent } from './add-thread/add-thread.component';
import { ThreadDetailComponent } from './thread-detail/thread-detail.component';
import { ThreadListComponent } from './thread-list/thread-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'threads', pathMatch: 'full' },
  { path: 'threads', component: ThreadListComponent },
  { path: 'thread/:id', component: ThreadDetailComponent },
  { path: 'addThread', component: AddThreadComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
