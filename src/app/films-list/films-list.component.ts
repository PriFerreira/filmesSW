import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/film';
import { FilmsService } from 'src/app/films.service';

@Component({
  selector: 'app-films-list',
  template: `
    
  <section *ngIf="isLoading && !errorMessage">
  Loading our hyperdrives!!! Retrieving data...
  </section>
  <!-- this is the new syntax for ng-repeat -->

  <div class="container">
  <div class="row">
    <div class="col-4">
      <div >
        <ul class="list-group" role="tablist">
          <div class="list-group-item list-group-item-action name-film">
            List Films
          </div>
          <li *ngFor="let film of films">
            <a type="button" class="btn btn-dark" [routerLink]="['/films', film.id]"
                class="list-group-item list-group-item-action" 
                id="list-home-list" data-toggle="list" href="#list-home" 
                role="tab" aria-controls="home">
              {{film.title}} 
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
  <section *ngIf="errorMessage">
    {{errorMessage}}
  </section>

  `,
  styleUrls: ['./films-list.component.scss']
})
export class FilmsListComponent implements OnInit {

  films : Film[] = [];
  errorMessage : string = '';
  isLoading : boolean = true;

  constructor(private service : FilmsService) { }

  ngOnInit(){
    this.service
      .getAll()
      .subscribe(
        p => this.films = p,
        e => this.errorMessage = e,
        () => this.isLoading = false);
  }
}
