import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Film } from './film';

const FILMS : Film[] = [
      {id: 1, 
        title: 'A New Hope', 
        episode: 4, 
        opening_crawl: 'It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base....',
        director: 'George Lucas', 
        producer: 'Gary Kurtz, Rick McCallum',
        release_date:  '1977-05-25',
        characters: '[]',
      },
      {id: 2, 
        title: 'The Empire Strikes Back', 
        episode: 5, 
        opening_crawl: 'It is a dark time for the\r\nRebellion. Although the Death\r\nStar has been destroyed...',
        director: 'Irvin Kershner', 
        producer: 'Gary Kurtz, Rick McCallum',
        release_date:  '1980-05-17',
        characters: '[]',
      },
      
      {id: 3, 
        title: 'Return of the Jedi', 
        episode: 6, 
        opening_crawl: 'Luke Skywalker has returned to\r\nhis home planet of Tatooine in\r\nan attempt to...',
        director: 'Richard Marquand', 
        producer: 'Howard G. Kazanjian, George Lucas, Rick McCallum',
        release_date:  '1983-05-25',
        characters: '[]',
      },
    ];

@Injectable()
export class FilmsService {
  private baseUrl: string = 'https://swapi.co/api';
  constructor(private http : Http){
  }

  getAll() : Observable<Film[]> {
    let films$ = this.http
      .get(`${this.baseUrl}/films`, { headers: this.getHeaders()})
      .map(mapFilms)
      .catch(handleError);
      return films$;
  }

  private getHeaders() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }
  get(id : number) : Observable<Film> {
    let film$ = this.http
      .get(`${this.baseUrl}/films/${id}`, {headers: this.getHeaders()})
      .map(mapFilm)
      .catch(handleError);
      return film$;
  }

  save(film : Film) : Observable<Response> {
    return this
      .http
      .put(`${this.baseUrl}/films/${film.id}`, 
            JSON.stringify(film), 
            {headers: this.getHeaders()});
  }

}

function toFilm(r : any) : Film {
  let film = <Film> ({
    id: extractId(r),
    title: r.title,
    episode: Number.parseInt(r.episode_id),
    opening_crawl : r.opening_crawl,
    director: r.director, 
    producer:  r.producer,
    release_date:  r.release_date,
    characters: r.characters,
  });
  
  return film;
}

function mapFilms(response : Response): Film[] {
  return response.json().results.map(toFilm)
}

function extractId(filmData : any) {
  let extractedId = filmData.url.replace('https://swapi.co/api/films/','').replace('/','');
  return parseInt(extractedId);
}

function mapFilm(response : Response) : Film {
   return toFilm(response.json());
}

function handleError(error : any) {

  let errorMsg = error.message || `There was a problem with and we couldn't retrieve your data! Sorry =( `
  console.error(errorMsg);
  return Observable.throw(errorMsg);

}

