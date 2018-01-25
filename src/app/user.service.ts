import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { Hero } from './hero';
import { FileInfo } from './file-info';
import { FileData } from './file-data';
import { AppConfig } from './app.config';
import { User } from './user';

import { Location } from '@angular/common';


@Injectable()
export class UserService {
  constructor(
    private http: HttpClient,
    private location: Location,
    private config: AppConfig
  ) { }

  getAll() {
    return this.http.get( this.config.apiUrl + '/users', this.jwt() )
      .map( ( response: any ) => response );
  }

  getUserById( id: number ) {
    return this.http.get( this.config.apiUrl + '/users/' + id, this.jwt() )
      .map( ( response: any ) => response );
  }

  getUserByName( term: string ): Observable<User[]> {
    return this.http.get<User[]>( this.config.apiUrl + '/users/search/' + term, this.jwt() )
      .map( ( response: any ) => response );
  }
  create( user: User ) {
    return this.http.post( this.config.apiUrl + '/users/register', user, this.jwt() );
  }

  update( user: User ) {
    return this.http.put( this.config.apiUrl + '/users/' + user.id, user, this.jwt() );
  }

  delete( id: number ) {
    return this.http.delete( this.config.apiUrl + '/users/' + id, this.jwt() );
  }

  goBack(): void {
    this.location.back();
  }
  // private helper methods

  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse( localStorage.getItem( 'currentUser' ) );
    if ( currentUser && currentUser.token ) {
      let headers = new HttpHeaders( { 'Authorization': 'Bearer ' + currentUser.token } );
      return { headers: headers };
    }
  }
}
