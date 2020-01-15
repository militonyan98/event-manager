import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventGridComponent } from './event-grid/event-grid.component';

const routes: Routes = [
  
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'events',
    component: EventListComponent
  },
  {
    path: 'view-events',
    component: EventGridComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
