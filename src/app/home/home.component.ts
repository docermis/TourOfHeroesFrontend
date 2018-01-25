import { Component } from "@angular/core";
import { MessageService } from "../message.service";
import { UserService } from "../user.service";
import { User } from "../user";



@Component( {
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
} )
export class HomeComponent {

  userList: User[];
  currentUser = JSON.parse( localStorage.getItem( 'currentUser' ) );

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    if ( this.currentUser ) {
      this.getUsers();
    }
  }


  getUsers(): void {
    this.userService.getAll()
      .subscribe( result => {
        this.userList = result;
        this.messageService.add( 'User Service: Users fetched.' );
      },
      error => this.messageService.add( 'User Service: FAILED to fetch users.' )
      );
  }

  deleteUser( user: User ): void {
    this.userService.delete( user.id )
      .subscribe( result => {
        this.messageService.add( `User Service: User "${user.username}" deleted.` )
        this.getUsers();
      },
      error => this.messageService.add( `User Service: User "${user.username}" not deleted.` )
      );
  }

}
