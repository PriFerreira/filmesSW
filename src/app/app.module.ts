import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { MinValidatorDirective } from './min-validator.directive';
import { MaxValidatorDirective } from './max-validator.directive';
import { FilmsListComponent } from './films-list/films-list.component';
import { FilmsService } from './films.service';
import { FilmDetailsComponent } from './film-details/film-details.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    MinValidatorDirective,
    MaxValidatorDirective,
    FilmsListComponent,
    FilmDetailsComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [
  FilmsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
