import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input() user: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get( 'id' );
    this.userService.getUserById( id )
      .subscribe( user => {
        this.user = user;
        if ( this.user.id == 0 ) {
          this.messageService.add( `User Service: User id = "${id}" not found.` );
        }
        else {
          this.messageService.add( `User Service: User "${this.user.username}" fetched.` );
        }
      },
      error => this.messageService.add( `User Service: User "${this.user.username}" FAILED to fetch.` )
      );
  }

  save(): void {
    this.userService.update( this.user )
      .subscribe( () => this.userService.goBack() );
  }

  goBack(): void {
    this.userService.goBack();
  }

}
