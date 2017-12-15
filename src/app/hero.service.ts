import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { Hero } from './hero';
import { FileInfo } from './file-info';

import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Injectable()
export class HeroService {

  constructor(
    private http: HttpClient,
    private location: Location,
    private router: Router
  ) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>( 'http://localhost:60525/api/detail' );
  }

  getHero( id: number ): Observable<Hero> {
    return this.http.get<Hero>( 'http://localhost:60525/api/detail/' + id );
  }

  getHeroByName( name: string ): Observable<Hero> {
    return this.http.get<Hero>( 'http://localhost:60525/api/detail/byName/' + name );
  }

  updateHero( hero: Hero ): Observable<any> {
    return this.http.put<any>( 'http://localhost:60525/api/detail/' + hero.id, hero );
  }

  submitHero( hero: Hero ): Observable<any> {
    return this.http.post<any>( 'http://localhost:60525/api/detail/', hero );
  }

  deleteHero( hero: Hero ): Observable<any> {
    return this.http.delete<any>( 'http://localhost:60525/api/detail/' + hero.id );
  }

  searchHeroes( term: string ): Observable<Hero[]> {
    return this.http.get<Hero[]>( 'http://localhost:60525/api/search/' + term );
  }

  uploadFile( fileToUpload: any ): Observable<FileInfo> {
    var input = new FormData();
    input.append( "file", fileToUpload );

    return this.http.post<FileInfo>( 'http://localhost:60525/api/search/', input );
  }

  updateXmlFile( fileInfo: FileInfo ): Observable<any> {
    return this.http.post<any>( 'http://localhost:60525/api/search/form/', fileInfo );
  }


  goBack(): void {
    this.location.back();
  }

  goTo(): void {
    this.router.navigate( ['/heroes'] );
  }


}
