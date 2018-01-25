import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MessageService } from '../message.service';
import { AuthenticationService } from '../authentication.service';
import { User } from '../user';
import { UserCredentials } from '../user-credentials';


@Component( {
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
} )
export class LoginComponent implements OnInit {
  model: UserCredentials = {
    username: "username",
    password: "password"
  }
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loading = true;
    this.authenticationService.login( this.model )
      .subscribe( result => {
        this.router.navigate( [this.returnUrl] );
        this.messageService.add( `Logged in as: ${ JSON.parse( localStorage.getItem( 'currentUser' ) ).username }` );
      },
      error => {
        this.messageService.add( "Failed to login!" );
        this.loading = false;
      }
      );
  }


}
