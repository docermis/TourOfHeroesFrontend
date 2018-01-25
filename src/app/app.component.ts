import { Component } from '@angular/core';
import { User } from './user';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
} )
export class AppComponent {
  title = 'Tour of Heroes';
  //make a home component for currentUser
  //currentUser: User;

  //ngOnInit() {
  //  this.currentUser = JSON.parse( localStorage.getItem( 'currentUser' ) );
  //}

}
