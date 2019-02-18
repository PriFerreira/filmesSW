import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { FilmsService } from "../films.service";
import { Film } from "../film";

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styles: []
})
export class FilmDetailsComponent implements OnInit, OnDestroy {
  
  film: Film;
  sub:any;

  constructor(private route: ActivatedRoute,
              private filmsService: FilmsService,
              private router: Router) { }

  ngOnInit() { 
    this.sub = this.route.params.subscribe(params => {
      let id = Number.parseInt(params['id']);
      console.log('getting film with id: ', id);
      this.filmsService
        .get(id)
        .subscribe(p => this.film = p);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoFilmsList(){
    let link = ['/films'];
    this.router.navigate(link);
  }

  saveFilmDetails(){
      this.filmsService
          .save(this.film)
          .subscribe(r => console.log(`saved!!! ${JSON.stringify(this.film)}`));
  }
}
