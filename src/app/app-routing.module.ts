import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilmsListComponent } from './films-list/films-list.component';
import { FilmDetailsComponent } from './film-details/film-details.component';

const routes: Routes = [
  { path: 'films', component: FilmsListComponent },
  { path: 'films/:id', component: FilmDetailsComponent },
  { path: '', redirectTo: '/films', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
