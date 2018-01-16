import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';

import { Router } from '@angular/router';
import { AppConfig } from './app.config';


@Injectable()
export class AuthenticationService {


  constructor(
    private http: HttpClient,
    private config: AppConfig
  ) { }

  login( userName: string, password: string ): Observable<any> {
    return this.http.post<any>( this.config.apiUrl + 'users/authenticate', { username: userName, password: password } )
      .map( ( response: Response ) => {
        // login successful if there's a jwt token in the response
        let user = response.json();
        if ( user && user.token ) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem( 'currentUser', JSON.stringify( user ) );
        }
      } );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem( 'currentUser' );
  }
}
