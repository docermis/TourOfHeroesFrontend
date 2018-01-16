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

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient,
    private config: AppConfig
  ) { }

  getAll() {
    return this.http.get( this.config.apiUrl + '/users', this.jwt() ).map( ( response: Response ) => response.json() );
  }

  getById( id: string ) {
    return this.http.get( this.config.apiUrl + '/users/' + id, this.jwt() ).map( ( response: Response ) => response.json() );
  }

  create( user: User ) {
    return this.http.post( this.config.apiUrl + '/users/register', user, this.jwt() );
  }

  update( user: User ) {
    return this.http.put( this.config.apiUrl + '/users/' + user.id, user, this.jwt() );
  }

  delete( id: string ) {
    return this.http.delete( this.config.apiUrl + '/users/' + id, this.jwt() );
  }

  // private helper methods

  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse( localStorage.getItem( 'currentUser' ) );
    if ( currentUser && currentUser.token ) {
      let headers = new HttpHeaders( { 'Authorization': 'Bearer ' + currentUser.token } );
      return { headers: headers } ;
    }
  }
}
