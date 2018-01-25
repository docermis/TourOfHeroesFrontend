import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';

import { Router } from '@angular/router';
import { AppConfig } from './app.config';
import { User } from './user';
import { MessageService } from './message.service';
import { UserCredentials } from './user-credentials';


@Injectable()
export class AuthenticationService {
  

  constructor(
    private http: HttpClient,
    private config: AppConfig,
    private messageService: MessageService
  ) { }

  login( userCredentials: UserCredentials ): Observable<any> {
    return this.http.post<any>( this.config.apiUrl + '/users/authenticate', userCredentials )
      .map( ( response: any ) => {
        // login successful if there's a jwt token in the response
        if ( response && response.token ) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem( 'currentUser', JSON.stringify( response ) );
          console.log( localStorage.getItem( 'currentUser' ) );
        }
      } );
  }

  logout() {
    // remove user from local storage to log user out
    if ( localStorage.getItem( 'currentUser' ) )
    {
      this.messageService.add( "Logged out!" );
    }
    localStorage.removeItem( 'currentUser' );
  }
}
