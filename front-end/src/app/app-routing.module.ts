import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BookFlightComponent} from './book-flight/book-flight.component';
import {ViewDetailsComponent } from './view-details/view-details.component';
import {FrontPageComponent } from './front-page/front-page.component';

const routes: Routes = [
  {path: '', component: FrontPageComponent},
  {path: 'book', component: BookFlightComponent},
  {path: 'view', component: ViewDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
