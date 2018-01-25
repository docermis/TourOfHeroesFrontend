import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component( {
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
} )
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  users$: Observable<User[]>;
  private searchTerms = new Subject<string>();
  private searchTerms2 = new Subject<string>();

  constructor(
    private heroService: HeroService,
    private userService: UserService
  ) { }

  // Push a search term into the observable stream.
  search( term: string ): void {
    this.searchTerms.next( term );
  }

  //search2( term2: string ): void {
  //  this.searchTerms2.next( term2 );
  //}


  ngOnInit(): void {
      this.heroes$ = this.searchTerms.pipe(
        debounceTime( 300 ),
        distinctUntilChanged(),
        switchMap( ( term: string ) => this.heroService.searchHeroes( term ) ),
      );
    


    //this.users$ = this.searchTerms2.pipe(
    //  debounceTime( 300 ),
    //  distinctUntilChanged(),
    //  switchMap( ( term2: string ) => this.userService.getUserByName( term2 ) ),
    //);
  }
}
