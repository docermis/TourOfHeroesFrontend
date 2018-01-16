import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from '../message.service';
import { UserService } from '../user.service';
import { User } from '../user';


@Component( {
  moduleId: module.id,
  templateUrl: 'register.component.html'
} )

export class RegisterComponent {
  model = { id: undefined, firstName: "", lastName: "", username: "", password: "" };
  loading = false;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private userService: UserService
  ) { }

  register() {
    this.loading = true;
    this.userService.create( this.model )
      .subscribe(
      data => {
        this.messageService.add( 'Registration successful' );
        this.router.navigate( ['/login'] );
      },
      error => {
        this.messageService.add( error._body );
        this.loading = false;
      } );
  }
}
